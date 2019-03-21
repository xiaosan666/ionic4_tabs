import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';

import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { TabsPage } from './pages/tabs/tabs.page';
import { Tab1Page } from './pages/tab1/tab1.page';
import { DemoPage } from './pages/demo/demo.page';
import { MinePage } from './pages/mine/mine.page';

@NgModule({
    declarations: [AppComponent, TabsPage, Tab1Page, DemoPage, MinePage],
    entryComponents: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot({
            // https://ionicframework.com/docs/utilities/config
            hardwareBackButton: true,
            rippleEffect: false,
            mode: 'ios',
            backButtonText: '返回',
            statusTap: true,
            swipeBackEnabled: true
        }),
        HttpClientModule
    ],
    providers: [
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        StatusBar,
        SplashScreen,
        AppVersion,
        SocialSharing,
        PhotoLibrary,
        InAppBrowser,
        Network,
        AppMinimize
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
