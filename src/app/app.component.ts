import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { FooterTabPage } from '../pages/footer-tab/footer-tab';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = FooterTabPage;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private translateService: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    this.initTranslate();
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translateService.use('en');

    /*******OPTIONAL: check for the lang of the browser********/
    // if (this.translateService.getBrowserLang() !== undefined) {
    //     this.translateService.use(this.translateService.getBrowserLang());
    // } else {
    //     this.translateService.use('rs');
    // }
  }
}
