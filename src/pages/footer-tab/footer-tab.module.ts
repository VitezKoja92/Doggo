import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FooterTabPage } from './footer-tab';

@NgModule({
  declarations: [
    FooterTabPage,
  ],
  imports: [
    IonicPageModule.forChild(FooterTabPage),
  ],
  exports: [
    FooterTabPage
  ],
  entryComponents: [
    FooterTabPage
  ]
})
export class FooterTabPageModule {}
