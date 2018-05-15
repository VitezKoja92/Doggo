import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyDoggosPage } from './my-doggos';

@NgModule({
  declarations: [
    MyDoggosPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDoggosPage),
    TranslateModule
  ],
  exports: [
    MyDoggosPage
  ],
  entryComponents: [
    MyDoggosPage
  ]
})
export class MyDoggosPageModule {}
