import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { DashboardPage } from './dashboard';
import { FooterTabPageModule } from '../footer-tab/footer-tab.module';

@NgModule({
  declarations: [
    DashboardPage,
  ],
  imports: [
    IonicPageModule.forChild(DashboardPage),
    FooterTabPageModule
  ],
  exports: [
    DashboardPage
  ],
  entryComponents: [
    DashboardPage
  ]
})
export class DashboardPageModule {}
