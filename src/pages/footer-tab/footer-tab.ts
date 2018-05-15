import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StatsPage } from './../stats/stats';
import { DashboardPage } from './../dashboard/dashboard';
import { MyDoggosPage } from './../my-doggos/my-doggos';

@IonicPage()
@Component({
  selector: 'page-footer-tab',
  templateUrl: 'footer-tab.html',
})
export class FooterTabPage {
 // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root = DashboardPage;
  tab2Root = MyDoggosPage;
  tab3Root = StatsPage;
  // tab4Root = AlarmsPage;


  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
  }

}
