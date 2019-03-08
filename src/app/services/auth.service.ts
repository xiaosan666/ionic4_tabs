import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';
import { Utils } from '../providers/Utils';
import { map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GlobalData } from '../providers/GlobalData';
import { FileService } from '../providers/FileService';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(public http: HttpService, public fileService: FileService) {
    }

    // 获取token
    getToken(username, password) {
        return this.http.post('/v1/login', {
            'client_id': 'app',
            'username': username,
            'password': Utils.md5(password)
        });
    }

    // 查询用户信息
    getUserInfo() {
        return this.http.get('/v1/public/user/self').pipe(
            mergeMap(res => {
                if (!res.avatarId) {
                    res.avatarPath = GlobalData.avatarPath;
                    return of(res);
                } else {
                    return this.fileService.getFileInfoById(res.avatarId).pipe(
                        map(file => {
                            res.avatarPath = file.origPath || GlobalData.avatarPath;
                            return res;
                        })
                    );
                }
            })
        );
    }

    // 获取新token
    getNewToken() {
        return this.http.post('/v1/refresh_token');
    }
}
