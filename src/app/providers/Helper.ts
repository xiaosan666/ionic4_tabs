import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Platform, ToastController } from '@ionic/angular';
import { Logger } from './Logger';
import { environment } from '../../environments/environment';

/**
 * 帮助类：存放和业务有关的公共方法
 */
@Injectable({
    providedIn: 'root'
})
export class Helper {
    readonly IsMobile: boolean = false;
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
     * alert弹框，默认只有确定按钮，当存在取消回调函数则会显示取消按钮
     * 注：如果存在打开的alert则不再打开
     * @param header 需要显示的title
     * @param message 需要显示的内容
     * @param okBackFun 成功回调
     * @param cancelBtnFun 失败回调
     */
    alert(header = '', message = '', okBackFun = null, cancelBtnFun = null): void {
        if (document.querySelector('.alert-wrapper')) {
            Logger.log('alert已经存在');
            return;
        }
        const buttons = [{
            text: '确定', handler: () => {
                if (okBackFun) {
                    okBackFun();
                }
            }
        }];
        if (cancelBtnFun) {
            const cancelBtn = {
                text: '取消',
                role: 'cancel',
                handler: () => {
                    cancelBtnFun();
                }
            };
            buttons.unshift(cancelBtn);
        }
        this.alertController.create({
            header,
            message,
            buttons,
            // cssClass: 'alert-zIndex-highest',
            backdropDismiss: false
        }).then(alert => alert.present());
    }

    /**
     * 显示提示信息
     * 建议优先调用 NativeService.toast
     */
    toast(message: string = '操作成功', duration: number = 2500, position: 'top' | 'bottom' | 'middle' = 'middle'): void {
        const opts = {message, duration, position, showCloseButton: true, closeButtonText: '✖'};
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
            spinner: 'dots', // https://ionicframework.com/docs/api/spinner
            duration: environment.requestTimeout,
            message
        }).then(loading => {
            loading.present();
            this.Loading = loading;
        });
    }

    /**
     * 关闭loading
     */
    hideLoading(): void {
        // loadingController.create 方法是异步，调用关闭时可能存在未打开的情况
        if (this.LoadingIsExist) {
            if (this.Loading) {
                this.Loading.dismiss();
                this.Loading = null;
                this.LoadingIsExist = false;
            } else {
                setTimeout(() => {
                    this.Loading && this.Loading.dismiss();
                    this.Loading = null;
                    this.LoadingIsExist = false;
                }, 200);
            }
        }
    }
}
