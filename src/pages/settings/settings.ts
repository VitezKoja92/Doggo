import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { LanguageEnum } from './../../rest/enums/languageEnum';
import { TranslateService } from '@ngx-translate/core';
import { Language } from './../../rest/models/language';
import { LanguageEndpointService } from './../../rest/api/languageEndpoint.service';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  public languages: Language[] = [];
  public languageChoice: LanguageEnum = <LanguageEnum>this.translateService.currentLang;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private translateService: TranslateService,
              private languageEndpointService: LanguageEndpointService) {
  }

  ionViewWillEnter() {
    this.languageEndpointService.getLanguages().subscribe(
      (languages: Language[]) => {
        this.languages = languages;
      }
    );
  }

  dissmissSettingsModal() {
    this.translateService.use(this.languageChoice);
    this.viewCtrl.dismiss();
  }

}
