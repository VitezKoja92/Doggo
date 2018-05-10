import { DoggosEndpointService } from './../rest/api/doggosEndpoint.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DashboardPageModule } from './../pages/dashboard/dashboard.module';
import { FooterTabPageModule } from './../pages/footer-tab/footer-tab.module';
import { DashboardPage } from './../pages/dashboard/dashboard';
import { FooterTabPage } from './../pages/footer-tab/footer-tab';
import { MyDoggosPageModule } from './../pages/my-doggos/my-doggos.module';
import { MyDoggosPage } from './../pages/my-doggos/my-doggos';
import { StatsPageModule } from './../pages/stats/stats.module';
import { StatsPage } from './../pages/stats/stats';

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
    MyDoggosPageModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
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
    DoggosEndpointService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
