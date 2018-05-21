import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { MyDoggosFiltersPage } from './my-doggos-filters';

@NgModule({
  declarations: [
    MyDoggosFiltersPage,
  ],
  imports: [
    IonicPageModule.forChild(MyDoggosFiltersPage),
    TranslateModule
  ],
  exports: [
    MyDoggosFiltersPage
  ],
  entryComponents: [
    MyDoggosFiltersPage
  ]
})
export class MyDoggosFiltersPageModule {}
