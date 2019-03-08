import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GlobalData {
    static userId: string; // 用户id
    static username: string; // 用户名
    static mobileNumber: string; // 手机号码
    static realname: string; // 真实姓名

    static avatarPath: string = environment.defaultAvatar; // 用户头像

    static token: string; // token

}
