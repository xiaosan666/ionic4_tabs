import { Injectable } from '@angular/core';
import JsEncrypt from 'jsencrypt';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

/**
 * 简书文章：
 * https://www.jianshu.com/p/b45d835b201b
 *
 * 加密工具类
 * rsa非对称加密
 *  针对敏感数据，前端使用此方法加密后传递给后端，后端使用私钥解密
 *  公钥保存在前端，私钥保存在后端，不进行传输
 *  @example
 const publicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoYxMpKFXbyiehp9ktu+dDlcSp9UZnRFEdYiMPvqzrU6grokp/g3uijsXZN1cZbQc4LSSRvLnC/SIwZRxA2i5H9MQOBlM9qhBXFcAlinsfY3PE4LNlbYvLT5F9G/sbSP8VunzFnQdj6CPtLABnAinAtEZ8krNVPLpLGmzJfR/mzwIDAQAB';
 const privateKey = 'MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBAKhjEykoVdvKJ6Gn2S2750OVxKn1RmdEUR1iIw++rOtTqCuiSn+De6KOxdk3VxltBzgtJJG8ucL9IjBlHEDaLkf0xA4GUz2qEFcVwCWKex9jc8Tgs2Vti8tPkX0b+xtI/xW6fMWdB2PoI+0sAGcCKcC0RnySs1U8uksabMl9H+bPAgMBAAECgYBlvvfk9qpqlEw+Md3Y9KFZBTZAPCS+YVliF9p3uQ9jYrlLJFU/l4MtRnfmOLo4ctjZ6O0f4pmcaLgv5eichzlO5JODg46LEB5VwGiZZVxN2Hh2FcTaQ7i0duwhYBD8bl7BLZI13Bu/Yv4MwjNBQr/r6++emvcr/036BKIwWaAkAQJBAOrrMANMKg/yHlKoL3zk7btCL0WVUHBZ/Sd3Ef1IlFI75Uvjr7iQHwm/XO9oAauoME0rV8kanE0xHHZ+15WpL6ECQQC3f3KZ7NAr5lRIo1PHHG5Xk9s6iuULI5T1uhFCkuYgrzqyHmPkjxaJzNOsnVachgU0+B1gDmK7ppnIDXXPXEBvAkAS7gq7aUrGaCs7W+Qfu07Q1R98CvElbIrywCyJ7WxOSBdNCzbgt3RY07vIaugfjfj+buyu/t7zdW6mucfjfnOhAkBP3KUY/us/H/iwwHzW3LXdYdl5KjgzV+Id7ERU0DBeK0WFfhqFwAzUHpRFvRiT+PRNMGtAgiJQf1rQqaMLg5/7AkAQixYTAfaXAE58wmIQnHXarQ9wvMQmq1cHbYXkyf3gMh/8DrURaS3sWpeY/N6qbqPCCET0q4n7RgVn4MyzC06N';
 const str = '1234567890!@#$%^&*()这是将要加密的数据';
 const rsaEncrypt = Encrypt.rsaEncrypt(str, publicKey);
 console.log('rsa加密结果：', rsaEncrypt);
 const rsaDecrypt = Encrypt.rsaDecrypt(rsaEncrypt, privateKey);
 console.log('rsa解密结果：', rsaDecrypt);
 *
 *
 * aes对称加密
 *  生成一个key，可以同时用于加密和解密
 *  主要用途：前端用rsa加密后传给后端，后端用key加密数据返回给前端，前端在用此key解密
 *  @example
 // const key = Utils.uuid().substr(0, 16); // 动态生成16位长度的key
 const key = 'fa9353c6179dfbfa';
 const aesEncrypt = Encrypt.aesEncrypt(str, key);
 console.log('aes加密结果：', aesEncrypt);
 const aesDecrypt = Encrypt.aesDecrypt(aesEncrypt, key);
 console.log('aes解密结果：', aesDecrypt);
 *
 */
@Injectable({
    providedIn: 'root'
})
export class Encrypt {
    private static jsEncrypt = null;

    /**
     * rsa加密
     */
    static rsaEncrypt(str: any, publicKey: string = environment.rsaPublicKey) {
        if (!this.jsEncrypt) {
            this.jsEncrypt = new JsEncrypt();
        }
        if (typeof str !== 'string') {
            str = JSON.stringify(str);
        }
        this.jsEncrypt.setPublicKey(publicKey);
        // 由于rsa加密的数据可能有特殊字符，所以这里在用window.btoa进行base64编码，后端获取到数据需要先base64解码，然后再用私钥解密
        return window.btoa(this.jsEncrypt.encrypt(str));
    }

    /**
     * rsa解密
     * @privateKey 由于私钥只保存在后端，此方法只用于前端临时测试
     */
    static rsaDecrypt(str: string, privateKey) {
        if (!this.jsEncrypt) {
            this.jsEncrypt = new JsEncrypt();
        }
        this.jsEncrypt.setPrivateKey(privateKey);
        return this.jsEncrypt.decrypt(window.atob(str));
    }

    /**
     * aes加密
     * @key 最好动态生成，由于是对称算法，加解密需要同样的key
     */
    static aesEncrypt(str: any, key: string) {
        if (typeof str !== 'string') {
            str = JSON.stringify(str);
        }
        const parseStr = CryptoJS.enc.Utf8.parse(str);
        const parseKey = CryptoJS.enc.Utf8.parse(key);
        const aesEncrypt = CryptoJS.AES.encrypt(parseStr, parseKey, {
            iv: parseKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString();
        return window.btoa(aesEncrypt);
    }

    /**
     * aes解密
     * 本方法主要用于解密后端返回的加密数据，具体实现方法：
     * 前端动态生成key，把key和其他要传递的参数用rsa非对称算法加密传给后端，
     * 后端用私钥解密得到key，然后使用key调用aes对称加密数据，最后把数据传回前端，前端再调用aes解密方法得到数据
     */
    static aesDecrypt(str: string, key: string) {
        const parseKey = CryptoJS.enc.Utf8.parse(key);
        return CryptoJS.AES.decrypt(window.atob(str), parseKey, {
            iv: parseKey,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }).toString(CryptoJS.enc.Utf8);
    }


    /**
     * 字符串md5
     */
    static md5(str: string) {
        return CryptoJS.MD5(str).toString();
    }
}


/*
*
        const user = {
            'username': 'staff',
            'realname': '测试',
            'email': 'staff@123.com',
            'password': '123456'
        };
        // 前端加密数据到后端
        this.http.post('http://192.168.2.10:9898/api/v1/public/req_rsa', Encrypt.rsaEncrypt(user)).subscribe(res => {
            console.log('test1:', res);
            debugger;
        });

        // const key = Utils.uuid().substr(0, 16); // 动态生成16位长度的key
        const key = 'fa9353c6179dfbfa';
        user.secretKey = key;
        // 后端加密数据传递到前端，前端先把key加密传给后端
        this.http.post('http://192.168.2.10:9898/api/v1/public/req_rsa_resp_aes', Encrypt.rsaEncrypt(user)).subscribe(res => {
            const result = Encrypt.aesDecrypt(res, key);
            console.log('test2:', result);
            debugger;
        });
* */
