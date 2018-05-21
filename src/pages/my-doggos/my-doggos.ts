import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform, PopoverController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import { DoggosEndpointService } from '../../rest/api/doggosEndpoint.service';
import { Doggo } from './../../rest/models/doggo';
import { MyDoggosFiltersPage } from './../my-doggos-filters/my-doggos-filters';
import { FilterSettings } from './../../rest/models/filterSettings';

@IonicPage()
@Component({
  selector: 'page-my-doggos',
  templateUrl: 'my-doggos.html',
})
export class MyDoggosPage {

  // contains displayed doggos
  doggos: Doggo[] = [];
  // serach term entered in search field
  searchTerm: string = '';
  // indicates if the user is currently typing in search field or not
  isSearching = false;
  // search control
  searchControl: FormControl;
  // contains ids of selected doggos
  selectedDoggoIds: string[] = [];
  // indicates whether app is in selectMode
  isSelectMode = false;
  // indicates whether filter popover is opened
  filterPopoverOpened = false;
  // object containing current filter settings
  currentPopoverFilterSettings: FilterSettings = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public doggosEndpointService: DoggosEndpointService,
              public translateService: TranslateService,
              public alertCtrl: AlertController,
              public popoverCtrl: PopoverController,
              public platform: Platform) {

    this.searchControl = new FormControl();

  }

  ionViewWillEnter() {
    //retrieve doggos from db
    this.doggosEndpointService.getDoggos().subscribe(
      (doggos: Doggo[]) => {
        this.doggos = doggos;
      });
  };

  ionViewDidLoad() {
    // set initial set of doggos
    this.setFilteredDoggos();
    // update doggo list on change of the search term
    this.searchControl.valueChanges.debounceTime(700).subscribe(search => {
      this.isSearching = false;
      this.setFilteredDoggos();
    });
  }

  /**
   * Sets doggos in the list to the data returned from the service
   */
  setFilteredDoggos() {
    this.doggosEndpointService.getDoggos().subscribe(
      (doggos: Doggo[]) => {
        this.doggos = doggos.filter((doggo: Doggo) => {
          let searchTerm: string = this.searchTerm.toLowerCase();
          return doggo.generalInfo.name.toLowerCase().indexOf(searchTerm) !== -1 ||
                 doggo.generalInfo.owner.toLowerCase().indexOf(searchTerm) !== -1 ||
                 doggo.generalInfo.microchip.toLowerCase().indexOf(searchTerm) !== -1 ||
                 doggo.generalInfo.loiJr.toLowerCase().indexOf(searchTerm) !== -1;
        });
      });
  }

  /**
   * Triggered whenever user is typing in search field.
   * We use it to indicate when spinner should be displayed.
   */  
  onSearchInput() {
    this.isSearching = true;
  }

  /**
   * Creates and opens delete doggo confirmation
   */
  openDeleteConfirmation(doggoId: string) {
    let doggo: Doggo = null;
    this.doggosEndpointService.getDoggoById(doggoId).subscribe(
      (responseDoggo: Doggo) => {
        doggo = responseDoggo;

        let alert = this.alertCtrl.create({
          title: this.translateService.instant('MY_DOGGOS.DELETE_CONFIRMATION.TITLE', {doggoName: doggo.generalInfo.name}),
          message: this.translateService.instant('MY_DOGGOS.DELETE_CONFIRMATION.MESSAGE'),
          buttons: [
            {
              text: this.translateService.instant('MY_DOGGOS.DELETE_CONFIRMATION.NO_BUTTON_LABEL'),
              handler: () => {}
            },
            {
              text: this.translateService.instant('MY_DOGGOS.DELETE_CONFIRMATION.YES_BUTTON_LABEL'),
              handler: () => {
                this.deleteDoggo(doggoId);
              }
            }
          ]
        });
        alert.present();
      });
  }

  /**
   * Deletes the doggo from the database and reinitializes the list of doggos
   * @param doggoId 
   */
  deleteDoggo(doggoId: string) {
    this.doggosEndpointService.deleteDoggo(doggoId).subscribe(
      (doggoId: string) => {
        this.ionViewWillEnter();
      })
  }

  /**
   * toggles isSelectMode, and reinitializes selectedDoggoIds
   */
  toggleSelectMode(): void {
    this.isSelectMode = !this.isSelectMode;
    this.selectedDoggoIds = [];
  }

  /**
   * Whenever doggo in the list is selected or unselected we update the
   * selectedDoggosIds by pushing or popping items
   * @param doggoId 
   */
  updateSelection(doggoId: string) {
    const index = this.selectedDoggoIds.indexOf(doggoId)
    if (index === -1) {
      this.selectedDoggoIds.push(doggoId);
    } else {
      this.selectedDoggoIds.splice(index, 1)
    }
  }

  /**
   * Creates and opens delete more doggos confirmation
   */
  openDeleteMoreDoggosConfirmation() {
    const doggoNumber = this.selectedDoggoIds.length;
    let alert = this.alertCtrl.create({
      title: this.translateService.instant('MY_DOGGOS.DELETE_MORE_CONFIRMATION.TITLE', {doggoNumber: doggoNumber}),
      message: this.translateService.instant('MY_DOGGOS.DELETE_MORE_CONFIRMATION.MESSAGE'),
      buttons: [
        {
          text: this.translateService.instant('MY_DOGGOS.DELETE_MORE_CONFIRMATION.NO_BUTTON_LABEL'),
          handler: () => {}
        },
        {
          text: this.translateService.instant('MY_DOGGOS.DELETE_MORE_CONFIRMATION.YES_BUTTON_LABEL'),
          handler: () => {
            this.deleteSelectedDoggos();
          }
        }
      ]
    });
    alert.present();
  }

  /**
   * Goes through list of selected doggos and deletes each of them in the database.
   * In case of the last one to be deleted, we refresh the list of doggos, to contain
   * all doggos that are not deleted, we toggle the select mode, and we reinitialize selectedDoggosIds 
   */
  deleteSelectedDoggos() {
    this.selectedDoggoIds.forEach((doggoId: string) => {
      this.doggosEndpointService.deleteDoggo(doggoId).subscribe(() => {
        if (this.selectedDoggoIds.indexOf(doggoId) === this.selectedDoggoIds.length -1) {
          this.ionViewWillEnter();
          this.toggleSelectMode();
          this.selectedDoggoIds = [];
        }
      });
    });
  }

  /**
   * Opens filter button and updates filterOpened property
   * @param event 
   */
  openFilterPopover(event: MouseEvent) {
    let myDoggosFilterPopover = this.popoverCtrl.create(MyDoggosFiltersPage, this.currentPopoverFilterSettings, {cssClass: 'custom-popover'});
    myDoggosFilterPopover.present({ev: event});
    this.filterPopoverOpened = true;

    myDoggosFilterPopover.onDidDismiss((data: any) => {
      if (data) {
        this.currentPopoverFilterSettings = data.filterSettings;
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();

        this.doggosEndpointService.getDoggos().subscribe(
          (doggos: Doggo[]) => {
            this.doggos = doggos.filter((doggo: Doggo) => {

              const doggoBirthDate = new Date(doggo.generalInfo.dateOfBirth);
              
              return (this.currentPopoverFilterSettings.gender ? doggo.generalInfo.gender === this.currentPopoverFilterSettings.gender : true) &&
                     (this.currentPopoverFilterSettings.breed ? doggo.generalInfo.breed === this.currentPopoverFilterSettings.breed : true) &&
                     (this.currentPopoverFilterSettings.color ? doggo.generalInfo.color === this.currentPopoverFilterSettings.color : true) && 
                     (this.currentPopoverFilterSettings.age ? this.currentPopoverFilterSettings.age.min <= currentYear - doggoBirthDate.getFullYear() : true) &&
                     (this.currentPopoverFilterSettings.age ? this.currentPopoverFilterSettings.age.max >= currentYear - doggoBirthDate.getFullYear() : true);
          });
        });
      }
    }); 
  }

  /**
   * Returns true and shows 'Delete' button if at least one doggo is selected and app is in 'selectMode'
   */
  get showDeleteButton(): boolean {
    return this.selectedDoggoIds.length > 0 && this.isSelectMode;
  }

  /**
   * Returns true and shows title if the platform is IOS
   */
  get showTitle(): boolean {
    return this.platform.is('ios');
  }

  /**
   * Returns true if there are no doggos in the list
   */
  get noSearchResults(): boolean {
    return this.doggos.length === 0;
  }

  /**
   * Returns true if filter button should be disabled
   */
  get disableFilterButton(): boolean {
    return this.isSelectMode;
  }
}
