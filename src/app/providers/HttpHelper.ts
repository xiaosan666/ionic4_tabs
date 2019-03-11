import { Injectable } from '@angular/core';
import { Storage } from './Storage';
import { Logger } from './Logger';
import { Helper } from './Helper';

export declare interface RequestSetting {
    /**
     * 是否使用默认api
     */
    useDefaultApi?: boolean;
    /**
     * 请求结果是否需要缓存
     */
    needCache?: boolean;
    /**
     * 是否显示loading
     */
    showLoading?: boolean;
}

export declare interface RequestSetting {
    /**
     * 是否使用默认api
     */
    useDefaultApi?: boolean;
    /**
     * 请求结果是否需要缓存
     */
    needCache?: boolean;
    /**
     * 是否显示loading
     */
    showLoading?: boolean;
}

/**
 * http工具类
 */
@Injectable({
    providedIn: 'root'
})
export class HttpHelper {
    static requestCount = 0; // 记录未完成的请求数量,当请求数为0关闭loading,当不为0显示loading

    constructor(public helper: Helper) {
    }

    static getDefaultSetting(setting) {
        const defaultSetting: RequestSetting = {
            useDefaultApi: true,
            needCache: false,
            showLoading: true,
        };
        return setting ? {...defaultSetting, ...setting} : defaultSetting;
    }

    static getCacheData(options) {
        const cacheKey = HttpHelper.getCacheKey(options);
        return Storage.sessionStorage.get(cacheKey) || null;
    }

    static setCacheData(options, data: any) {
        const cacheKey = HttpHelper.getCacheKey(options);
        Storage.sessionStorage.set(cacheKey, data);
    }

    static getCacheKey(options) {
        const strParams = JSON.stringify(options.params);
        const strBody = JSON.stringify(options.body);
        return options.url + strParams + strBody;
    }

    requestBefore(options, setting: RequestSetting) {
        this.showLoading(setting);
        Logger.log('请求前', '#3880ff', 'options:', options);
    }

    requestSuccess(options) {
        this.hideLoading();
        Logger.log('请求成功', '#10dc60', 'options:', options);
    }

    requestError(options) {
        this.hideLoading();
        Logger.log('请求失败', '#f04141', 'options:', options);
    }

    private showLoading(setting: RequestSetting) {
        ++HttpHelper.requestCount;
        setting.showLoading && this.helper.showLoading();
    }

    private hideLoading() {
        --HttpHelper.requestCount === 0 && this.helper.hideLoading();
    }

}
