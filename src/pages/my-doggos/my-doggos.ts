import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';

import { DoggosEndpointService } from '../../rest/api/doggosEndpoint.service';
import { Doggo } from './../../rest/models/doggo';

@IonicPage()
@Component({
  selector: 'page-my-doggos',
  templateUrl: 'my-doggos.html',
})
export class MyDoggosPage {

  public doggos: Doggo[] = [];
  public selectedDoggoIds: string[] = [];
  public isSelectMode = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public doggosEndpointService: DoggosEndpointService,
              public translateService: TranslateService,
              public alertCtrl: AlertController,
              public platform: Platform) {}

  ionViewWillEnter() {
    //retrieve doggos from db
    this.doggosEndpointService.getDoggos().subscribe(
      (doggos: Doggo[]) => {
        this.doggos = doggos;
      });
  };

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

  deleteDoggo(doggoId: string) {
    this.doggosEndpointService.deleteDoggo(doggoId).subscribe(
      (doggoId: string) => {
        this.ionViewWillEnter();
      })
  }

  toggleSelectMode(): void {
    this.isSelectMode = !this.isSelectMode;
    this.selectedDoggoIds = [];
  }

  updateSelection(doggoId: string) {
    const index = this.selectedDoggoIds.indexOf(doggoId)
    if (index === -1) {
      this.selectedDoggoIds.push(doggoId);
    } else {
      this.selectedDoggoIds.splice(index, 1)
    }
  }

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

  get showButtons(): boolean {
    return this.selectedDoggoIds.length > 0 && this.isSelectMode;
  }

  get showTitle(): boolean {
    return this.platform.is('ios');
  }
  

}
