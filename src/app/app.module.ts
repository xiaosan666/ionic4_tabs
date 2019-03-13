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
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [],
    imports: [
        BrowserModule,
        AppRoutingModule,
        IonicModule.forRoot({mode: 'ios', backButtonText: '返回'}),
        HttpClientModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        AppVersion,
        SocialSharing,
        AppMinimize,
        PhotoLibrary,
        InAppBrowser,
        Network,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
