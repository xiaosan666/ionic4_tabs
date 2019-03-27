import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Logger } from './Logger';
import { environment } from '../../environments/environment';
import { Storage } from './Storage';
import { GlobalData } from './GlobalData';

/**
 * 帮助类：存放和业务有关的公共方法
 */
@Injectable({
    providedIn: 'root'
})
export class Helper {
    readonly IsMobile: boolean = false;
    private AlertIsExist = false;
    private LoadingIsExist = false;
    private Loading = null;


    constructor(public platform: Platform,
                public alertController: AlertController,
                public loadingController: LoadingController,
                public toastController: ToastController) {
        this.IsMobile = this.platform.is('cordova');
    }


    /**
     * 是否真机环境
     */
    isMobile(): boolean {
        return this.IsMobile;
    }

    /**
     * 是否真机环境
     */
    isNotMobile(): boolean {
        return !this.isMobile();
    }


    /**
     * 是否android真机环境
     */
    isAndroid(): boolean {
        return this.isMobile() && this.platform.is('android');
    }

    /**
     * 是否ios真机环境
     */
    isIos(): boolean {
        return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
    }


    /**
     * 断言是否真机环境
     */
    assertIsMobile(): void {
        if (this.isNotMobile()) {
            this.toast('请使用真机调试');
            throw new Error('请使用真机调试');
        }
    }

    /**
     * tip 开发中
     */
    tipDev() {
        this.toast('开发中');
    }

    /**
     * alert弹框，默认只有确定按钮，当存在取消回调函数则会显示取消按钮
     * 注：如果存在打开的alert则不再打开
     * @param header 需要显示的title
     * @param message 需要显示的内容
     * @param okBackFun 成功回调
     * @param cancelBtnFun 失败回调
     */
    alert(header = '', message = '', okBackFun = null, cancelBtnFun = null): void {
        // alertController.create是异步方法，所以使用AlertIsExist标志是否打开
        if (this.AlertIsExist) {
            Logger.log('alert已经存在，禁止重复打开');
            setTimeout(() => { // alert关闭的可能性比较多，不止点击确定或取消按钮
                this.AlertIsExist = false;
            }, 10000);
            return;
        }
        this.AlertIsExist = true;
        const buttons = [{
            text: '确定', handler: () => {
                this.AlertIsExist = false;
                okBackFun && okBackFun();
            }
        }];
        if (cancelBtnFun) {
            const cancelBtn = {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    this.AlertIsExist = false;
                    cancelBtnFun();
                }
            };
            buttons.unshift(cancelBtn);
        }
        this.alertController.create({
            header,
            message,
            buttons
        }).then(alert => alert.present());
    }

    /**
     * 显示提示信息
     * 建议优先调用 NativeService.toast
     */
    toast(message: string = '操作成功', duration: number = 2500, position: 'top' | 'bottom' | 'middle' = 'middle'): void {
        const opts = {message, duration, color: 'dark', position, showCloseButton: true, closeButtonText: '✖'};
        this.toastController.create(opts).then(toast => toast.present());
    }

    /**
     * 统一调用此方法显示loading
     */
    showLoading(message: string = ''): void {
        if (this.LoadingIsExist) {
            return;
        }
        this.LoadingIsExist = true;
        this.loadingController.create({
            spinner: 'bubbles', // dots https://ionicframework.com/docs/api/spinner
            duration: environment.requestTimeout,
            message
        }).then(loading => {
            // loadingController.create异步方法，调用loading.present()前有可能已经调用hideLoading方法
            if (this.LoadingIsExist) {
                loading.present();
                this.Loading = loading;
            } else {
                loading.dismiss();
            }
        });
    }

    /**
     * 关闭loading
     */
    hideLoading(): void {
        this.LoadingIsExist = false;
        if (this.Loading) {
            this.Loading.dismiss();
            this.Loading = null;
        }
    }


    /**
     * 登录成功处理
     */
    loginSuccessHandle(userInfo) {
        Storage.sessionStorage.clear(); // 清除数据缓存
        GlobalData.userId = userInfo.id;
        GlobalData.username = userInfo.username;
        GlobalData.realname = userInfo.realname;
        GlobalData.mobileNumber = userInfo.mobileNumber;
        GlobalData.avatarPath = userInfo.avatarPath;
    }

}
