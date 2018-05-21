import { GenderEnum } from './../../rest/enums/genderEnum';
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavParams } from 'ionic-angular';

import { FilterSettings } from './../../rest/models/filterSettings';

@IonicPage()
@Component({
  selector: 'page-my-doggos-filters',
  templateUrl: 'my-doggos-filters.html',
})
export class MyDoggosFiltersPage {

  filterSettings: FilterSettings = {};

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {

                this.filterSettings = navParams.data;
                this.age = {
                  lower: this.filterSettings.age ? this.filterSettings.age.min : this.AGE_FROM,
                  upper: this.filterSettings.age ? this.filterSettings.age.max : this.AGE_TO
                };
              }

  public readonly AGE_FROM = 0;
  public readonly AGE_TO = 20;
  age: any;

  /**
   * Closes the filterPopover by sending 
   * the entered data to the parent component
   */
  onSumbitFilter(): void {
    this.filterSettings.age = {
      min: this.age ? this.age.lower : this.AGE_FROM,
      max: this.age ? this.age.upper : this.AGE_TO
    }
    this.viewCtrl.dismiss({
      filterSettings: this.filterSettings
    });
  }

  /**
   * Closes the filterPopover
   */
  onDismissFilter(): void {
    this.viewCtrl.dismiss();
  }

  /**
   * Reinitializes filterSettings
   */
  onRestartFilter(): void {
    this.filterSettings = {};
    this.filterSettings.breed = null;
    this.filterSettings.color = null;
    this.filterSettings.age = null;
    this.age = {
      lower: this.AGE_FROM,
      upper: this.AGE_TO
    };
  }
}
