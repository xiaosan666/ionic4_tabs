import { Component } from '@angular/core';

import { NavController, Platform } from '@ionic/angular';
import { NativeService } from './providers/NativeService';
import { Helper } from './providers/Helper';
import { UserInfo } from './interfaces/UserInfo';
import { Storage } from './providers/Storage';
import { GlobalData } from './providers/GlobalData';
import { AuthService } from './services/auth.service';
import { mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {

    constructor(public platform: Platform,
                public nav: NavController,
                public router: Router,
                public helper: Helper,
                public native: NativeService,
                public auth: AuthService) {
        this.initializeApp();
        // 处理安卓返回按钮事件，更多情况请看 tabs.page.ts
        this.platform.backButton.subscribe(() => {
            if (this.router.url === '/login' && !GlobalData.token) {
                this.native.appMinimize();
            }
        });
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
                    this.nav.navigateRoot('/tabs/tab1'); // 会根据url自动匹配路由
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
