import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class GlobalData {
    public userId: string; // 用户id
    public username: string; // 用户名
    public realname: string; // 真实姓名

    public avatarPath: string = environment.defaultAvatar; // 用户头像

    public token: string = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZXMiOiJhcHBfYWRtaW4iLCJpc3MiOiJnemtpdC5jb20uY24iLCJpYXQiOjE1NTE4NjE2MTgsImNsaWVudF9pZCI6ImFwcCIsImp0aSI6IjZlMzA4NjNmNDMxYjRiZGZhYmEzNTFkNjFlZjJiZGFiIiwidXNlcm5hbWUiOiJhZG1pbiIsInJlYWxuYW1lIjoi5byg5peg5b-MIn0.tTdUEgNw6rc7-OLooDNNux6d0y4SjyVfCZfk1aNEGw_tv4VKIEa-GPCE0q8FPZiXeOmjRyjsgtJy8nyKCnt7sw'; // token

}
