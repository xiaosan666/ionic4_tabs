import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';
import { Utils } from '../providers/Utils';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalData } from '../providers/GlobalData';
import { FileService } from '../providers/FileService';
import { ValidationErrors } from '@angular/forms';

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

    getUserByName(value): Observable<ValidationErrors | null> {
        // todo 这里模拟后台操作
        /* return Observable.create(observer => {
             if (value === 'test') {
                 observer.next(null); // 返回null表示验证通过
             } else {
                 observer.next({'exist': value}); // 返回非null表示验证失败，其中'exist'可以作为验证失败的类型在页面上判断
             }
         });*/
        const url = '/v1/user/view/username_number';
        const paramMap = {username: value};
        return this.http.postFormData(url, paramMap, {showLoading: false}).pipe(
            map(userNumber => {
                return userNumber === 0 ? null : {'exist': value};
            })
        );
    }
}
