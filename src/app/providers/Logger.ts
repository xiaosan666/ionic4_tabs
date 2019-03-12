import { Injectable } from '@angular/core';

/**
 * 帮助类：存放和业务有关的公共方法
 */
@Injectable({
    providedIn: 'root'
})
export class Logger {
    static error(err: any, action: string) {
        this.log('Logger.error：', '#f04141', action, '\n ' + err);
    }

    static log(text, color = '#989aa2', ...detail) {
        console.log(`%c${text}`, `background-color: ${color}; color:white; padding: 2px 5px; border-radius: 2px`, ...detail);
    }

    static http(err: any, data) {
        console.log({...data}); // 上报日志
        Logger.error(err, '请求出错');
    }

}
