import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { DashboardPage } from './../pages/dashboard/dashboard';
import { DashboardPageModule } from './../pages/dashboard/dashboard.module';
import { FooterTabPage } from './../pages/footer-tab/footer-tab';
import { FooterTabPageModule } from './../pages/footer-tab/footer-tab.module';
import { HomePage } from '../pages/home/home';
import { MyApp } from './app.component';
import { MyDoggosPage } from './../pages/my-doggos/my-doggos';
import { MyDoggosPageModule } from './../pages/my-doggos/my-doggos.module';
import { RestApiModule } from './../rest/api/rest-api.module';
import { StatsPage } from './../pages/stats/stats';
import { StatsPageModule } from './../pages/stats/stats.module';
import { SettingsPageModule } from './../pages/settings/settings.module';
import { MyDoggosFiltersPageModule } from './../pages/my-doggos-filters/my-doggos-filters.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    DashboardPageModule,
    FooterTabPageModule,
    StatsPageModule,
    SettingsPageModule,
    RestApiModule,
    MyDoggosPageModule,
    MyDoggosFiltersPageModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DashboardPage,
    StatsPage,
    FooterTabPage,
    MyDoggosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
