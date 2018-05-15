import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { FooterTabPage } from './footer-tab';

@NgModule({
  declarations: [
    FooterTabPage,
  ],
  imports: [
    IonicPageModule.forChild(FooterTabPage),
    TranslateModule
  ],
  exports: [
    FooterTabPage
  ],
  entryComponents: [
    FooterTabPage
  ]
})
export class FooterTabPageModule {}
