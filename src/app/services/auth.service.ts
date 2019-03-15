import { Injectable } from '@angular/core';
import { HttpService } from '../providers/HttpService';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { GlobalData } from '../providers/GlobalData';
import { FileService } from '../providers/FileService';
import { ValidationErrors } from '@angular/forms';
import { Encrypt } from '../providers/Encrypt';

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
            'password': Encrypt.md5(password)
        });
    }

    // 获取新token（旧token作为请求头参数）
    getNewToken() {
        return this.http.post('/v1/refresh_token');
    }

    // 注册
    register(user) {
        return this.http.post('/v1/user/op/register', user);
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


    // 修改密码
    modifyPassword(oldPsw: string, newPsw: string) {
        return this.http.postFormData('/v1/update_password', {
            'old_password': Encrypt.md5(oldPsw),
            'new_password': Encrypt.md5(newPsw)
        });
    }

    // 判断用户名是否已经存在
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
