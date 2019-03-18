import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Logger } from './Logger';
import { Helper } from './Helper';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { AppMinimize } from '@ionic-native/app-minimize/ngx';
import { PhotoLibrary } from '@ionic-native/photo-library/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Network } from '@ionic-native/network/ngx';

declare let ImagePicker;

/**
 * Cordova插件（手机硬件）调用工具类
 */
@Injectable({
    providedIn: 'root'
})
export class NativeService {
    private AppVersionInfo: object = null;

    constructor(private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private appVersion: AppVersion,
                private socialSharing: SocialSharing,
                private minimize: AppMinimize,
                private photoLibrary: PhotoLibrary,
                private iab: InAppBrowser,
                private network: Network,
                public helper: Helper) {
    }

    /**
     * 设置状态栏样式
     * https://ionicframework.com/docs/native/status-bar
     */
    setStatusBarStyle(): void {
        if (this.helper.isMobile()) {
            // this.statusBar.overlaysWebView(false);
            // this.statusBar.styleLightContent();
            this.statusBar.styleDefault(); // 使用黑色字体
            this.statusBar.backgroundColorByHexString('#fff'); // 设置背景色
        }
    }

    /**
     * 隐藏启动页
     * https://ionicframework.com/docs/native/splash-screen
     */
    hideSplashScreen(): void {
        if (this.helper.isMobile()) {
            this.splashScreen.hide();
        }
    }

    /**
     * 最小化app
     */
    appMinimize() {
        this.minimize.minimize();
    }

    /**
     * 通过系统浏览器打开url
     */
    openUrlBySystemBrowser(url: string): void {
        this.iab.create(url, '_system');
    }

    /**
     * 获取网络类型 如`unknown`, `ethernet`, `wifi`, `2g`, `3g`, `4g`, `cellular`, `none`
     */
    getNetworkType(): string {
        this.helper.assertIsMobile();
        return this.network.type;
    }

    /**
     * 判断是否有网络
     */
    isConnecting(): boolean {
        return this.getNetworkType() !== 'none';
    }


    /**
     * 获取app名称，包名，版本号
     * https://ionicframework.com/docs/native/app-version
     */
    getAppVersionInfo() {
        this.helper.assertIsMobile();
        if (this.AppVersionInfo) {
            return of(this.AppVersionInfo);
        }
        const appInfo = {
            appName: '', // app name,如现场作业
            packageName: '', // app包名/id,如com.kit.ionic2tabs
            versionNumber: '', // app版本号,如0.0.1
            name: '' // ionic2tabs
        };
        return Observable.create(observer => {
            Promise.all([
                this.appVersion.getAppName(),
                this.appVersion.getPackageName(),
                this.appVersion.getVersionNumber()
            ]).then(result => {
                appInfo.appName = result[0];
                appInfo.packageName = result[1];
                appInfo.versionNumber = result[2];
                appInfo.name = result[1].split('.').pop();
                this.AppVersionInfo = appInfo;
                observer.next(appInfo);
            }).catch(err => {
                Logger.error(err, 'NativeService.getAppVersionInfo');
                observer.error(false);
            });
        });
    }

    /**
     * 获取照片 - 风格同微信获取照片
     * https://github.com/giantss/cordova-plugin-ImagePicker
     */
    getPictures(options = {}) {
        this.helper.assertIsMobile();
        const ops = {
            maximumImagesCount: 9,
            width: 1920,
            height: 1440,
            quality: 100,
            ...options
        };
        return Observable.create(observer => {
            ImagePicker.getPictures(result => {
                observer.next(result.images);
            }, err => {
                err === '已取消' ? console.log(err) : Logger.error(err, 'NativeService.getPictures');
                observer.error(false);
            }, ops);
        });
    }

    /**
     * 保存图片到本地相册
     * @param url 图片url或base64
     */
    savePicture(url: string) {
        this.helper.assertIsMobile();
        return Observable.create(observer => {
            // 请求权限
            this.photoLibrary.requestAuthorization({read: true, write: true}).then(() => {
                // 获取app包名作为相册名称
                this.getAppVersionInfo().subscribe(appInfo => {
                    // 执行保存操作
                    this.photoLibrary.saveImage(url, appInfo.name).then(res => {
                        observer.next(res);
                    }).catch(err => {
                        Logger.error(err, 'NativeService.savePicture');
                        observer.error(false);
                    });
                });
            }).catch(err => {
                Logger.error(err, 'NativeService.savePicture');
                observer.error(false);
            });
        });
    }

    /**
     * 调用系统分享功能  https://ionicframework.com/docs/native/social-sharing/
     * 注意：同时只能分享一种类型
     * @param message 分享文本
     * @param file 分享文件，如图片
     */
    share(message: string = null, file: string | string[] = null) {
        this.helper.assertIsMobile();
        this.socialSharing.share(message, null, file);
    }
}
