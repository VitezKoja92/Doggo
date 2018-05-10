import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { DoggosEndpointService } from '../../rest/api/doggosEndpoint.service';
import { Doggo } from './../../rest/models/doggo';

@IonicPage()
@Component({
  selector: 'page-my-doggos',
  templateUrl: 'my-doggos.html',
})
export class MyDoggosPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private doggosEndpointService: DoggosEndpointService
  ) {}

  ionViewDidLoad() {
    
  };

  // get getDoggos(): Doggo[] {
  //   return this.doggosEndpointService.getDoggos().subscribe((doggos: Doggo[]) => {
  //     return doggos;
  //   });
  // }

}
