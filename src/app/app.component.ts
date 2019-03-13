import { Component, ViewChild } from '@angular/core';

import { IonRouterOutlet, NavController, Platform } from '@ionic/angular';
import { NativeService } from './providers/NativeService';
import { Helper } from './providers/Helper';
import { UserInfo } from './interfaces/UserInfo';
import { Storage } from './providers/Storage';
import { GlobalData } from './providers/GlobalData';
import { AuthService } from './services/auth.service';
import { mergeMap } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

    constructor(public platform: Platform,
                public nav: NavController,
                public helper: Helper,
                public native: NativeService,
                public auth: AuthService) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            const oldToken = Storage.localStorage.get('token'); // 从缓存中获取token
            if (oldToken) {
                GlobalData.token = oldToken; // 旧token作为请求头参数，用旧token获取新token
                this.auth.getNewToken().pipe(
                    mergeMap(token => {
                        GlobalData.token = token;
                        Storage.localStorage.set('token', token);
                        return this.auth.getUserInfo();
                    })
                ).subscribe((userInfo: UserInfo) => {
                    this.helper.loginSuccessHandle(userInfo);
                    this.nav.navigateRoot('/');
                }, () => {
                    this.nav.navigateRoot('/login');
                });
            } else {
                this.nav.navigateRoot('/login');
            }
            this.native.setStatusBarStyle();
            this.native.hideSplashScreen();
            // this.versionService.checkVersion();
        });
    }

}
