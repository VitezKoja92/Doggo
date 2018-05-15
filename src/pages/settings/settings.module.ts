import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { SettingsPage } from './settings';

@NgModule({
  declarations: [
    SettingsPage,
  ],
  imports: [
    IonicPageModule.forChild(SettingsPage),
    TranslateModule
  ],
  exports: [
    SettingsPage
  ],
  entryComponents: [
    SettingsPage
  ]
})
export class SettingsPageModule {}
