import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { DoggosEndpointService } from './../../rest/api/doggosEndpoint.service';
import { Doggo } from './../../rest/models/doggo';
import { SettingsPage } from '../settings/settings';
import { GenderEnum } from './../../rest/enums/genderEnum';

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  public numberOfMaleDoggos = 0;
  public numberOfFemaleDoggos = 0;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public doggosEndpointService: DoggosEndpointService,
              public modalCtrl: ModalController) {
  }

  ionViewWillEnter() {
    this.doggosEndpointService.getDoggosByGender(GenderEnum.Male).subscribe((doggos: Doggo[]) => {
      this.numberOfMaleDoggos = doggos.length;
    });

    this.doggosEndpointService.getDoggosByGender(GenderEnum.Female).subscribe((doggos: Doggo[]) => {
      this.numberOfFemaleDoggos = doggos.length;
    });
  }

  openSettings() {
    let settingsModal = this.modalCtrl.create(SettingsPage);
    settingsModal.present();
  }
}
