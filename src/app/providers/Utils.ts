import { Injectable } from '@angular/core';

/**
 * 工具类：存放和业务无关的公共方法
 */
@Injectable({
    providedIn: 'root'
})
export class Utils {

    /**
     * 日期对象转为日期字符串
     * @param date 需要格式化的日期对象
     * @param sFormat 输出格式,默认为yyyy-MM-dd                        年：y，月：M，日：d，时：h，分：m，秒：s
     * @example  dateFormat(new Date())                               "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd')                  "2017-02-28"
     * @example  dateFormat(new Date(),'yyyy-MM-dd HH:mm:ss')         "2017-02-28 13:24:00"   ps:HH:24小时制
     * @example  dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss')         "2017-02-28 01:24:00"   ps:hh:12小时制
     * @example  dateFormat(new Date(),'hh:mm')                       "09:24"
     * @example  dateFormat(new Date(),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     * @example  dateFormat(new Date('2017-02-28 13:24:00'),'yyyy-MM-ddTHH:mm:ss+08:00')   "2017-02-28T13:24:00+08:00"
     */
    static dateFormat(date: Date, sFormat: String = 'yyyy-MM-dd'): string {
        const time = {
            Year: 0,
            TYear: '0',
            Month: 0,
            TMonth: '0',
            Day: 0,
            TDay: '0',
            Hour: 0,
            THour: '0',
            hour: 0,
            Thour: '0',
            Minute: 0,
            TMinute: '0',
            Second: 0,
            TSecond: '0',
            Millisecond: 0
        };
        time.Year = date.getFullYear();
        time.TYear = String(time.Year).substr(2);
        time.Month = date.getMonth() + 1;
        time.TMonth = time.Month < 10 ? '0' + time.Month : String(time.Month);
        time.Day = date.getDate();
        time.TDay = time.Day < 10 ? '0' + time.Day : String(time.Day);
        time.Hour = date.getHours();
        time.THour = time.Hour < 10 ? '0' + time.Hour : String(time.Hour);
        time.hour = time.Hour < 13 ? time.Hour : time.Hour - 12;
        time.Thour = time.hour < 10 ? '0' + time.hour : String(time.hour);
        time.Minute = date.getMinutes();
        time.TMinute = time.Minute < 10 ? '0' + time.Minute : String(time.Minute);
        time.Second = date.getSeconds();
        time.TSecond = time.Second < 10 ? '0' + time.Second : String(time.Second);
        time.Millisecond = date.getMilliseconds();

        return sFormat.replace(/yyyy/ig, String(time.Year))
            .replace(/yyy/ig, String(time.Year))
            .replace(/yy/ig, time.TYear)
            .replace(/y/ig, time.TYear)
            .replace(/MM/g, time.TMonth)
            .replace(/M/g, String(time.Month))
            .replace(/dd/ig, time.TDay)
            .replace(/d/ig, String(time.Day))
            .replace(/HH/g, time.THour)
            .replace(/H/g, String(time.Hour))
            .replace(/hh/g, time.Thour)
            .replace(/h/g, String(time.hour))
            .replace(/mm/g, time.TMinute)
            .replace(/m/g, String(time.Minute))
            .replace(/ss/ig, time.TSecond)
            .replace(/s/ig, String(time.Second))
            .replace(/fff/ig, String(time.Millisecond));
    }

    /**
     * 返回字符串长度，中文计数为2
     */
    static strLength(str: string): number {
        let len = 0;
        for (let i = 0, length = str.length; i < length; i++) {
            str.charCodeAt(i) > 255 ? len += 2 : len++;
        }
        return len;
    }

    /**
     * 密码强度 返回：low middle high
     */
    static checkPass(pwd) {
        let m = 0;
        if (pwd.length <= 6) {
            return 'low'; // 密码长度小于等于6
        }
        if (/\d/.test(pwd)) {
            m++; // 纯数字密码
        }
        if (/[a-z]/.test(pwd)) {
            m++; // 密码包含小写字母
        }
        if (/[A-Z]/.test(pwd)) {
            m++; // 密码包含大写字母
        }
        if (/\W/.test(pwd)) {
            m++; // 密码包含特殊字符
        }
        if (pwd.length > 15) {
            m = 4; // 密码长度大于15
        }
        if (m < 2) {
            return 'low';
        }
        if (m === 2) {
            return 'middle';
        }
        if (m >= 3) {
            return 'high';
        }
    }

    /**
     * 把url中的双斜杠替换为单斜杠
     * 如:http://localhost:8080//api//demo.替换后http://localhost:8080/api/demo
     */
    static formatUrl(url = ''): string {
        let index = 0;
        if (url.startsWith('http')) {
            index = 7;
        }
        return url.substring(0, index) + url.substring(index).replace(/\/\/*/g, '/');
    }

    /**
     * 产生一个随机的32位长度字符串
     */
    static uuid() {
        let text = '';
        const possible = 'abcdef0123456789';
        for (let i = 0; i < 19; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text + new Date().getTime();
    }

    /**
     * 根据图片路径把图片转为base64字符串格式
     */
    static convertImgToBase64(url: string, callback: Function, width: number = null, height: number = null, outputFormat = 'image/jpg') {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function () {
            const canvas = <HTMLCanvasElement>document.createElement('canvas');
            canvas.width = width || img.width;
            canvas.height = height || img.height;
            const context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imgBase64 = canvas.toDataURL(outputFormat);
            if (callback) {
                callback(imgBase64);
            }
        };
        img.src = url;
    }

}
