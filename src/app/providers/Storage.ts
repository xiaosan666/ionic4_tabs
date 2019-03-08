import { Injectable } from '@angular/core';

/**
 * 缓存工具类
 * 注：代码中务必使用此方法缓存数据，方便以后切换缓存机制
 */
@Injectable({
    providedIn: 'root'
})
export class Storage {
    public static sessionStorage = {
        set(key: string, value: any) {
            sessionStorage.setItem(key, JSON.stringify(value));
        },
        get(key: string) {
            const jsonString = sessionStorage.getItem(key);
            return jsonString ? JSON.parse(jsonString) : null;
        },
        remove(key: string) {
            sessionStorage.removeItem(key);
        },
        clear() {
            sessionStorage.clear();
        }
    };

    public static localStorage = {
        set(key: string, value: any) {
            localStorage.setItem(key, JSON.stringify(value));
        },
        get(key: string) {
            const jsonString = localStorage.getItem(key);
            return jsonString ? JSON.parse(jsonString) : null;
        },
        remove(key: string) {
            localStorage.removeItem(key);
        },
        clear() {
            localStorage.clear();
        }
    };

}
