import { Component } from '@angular/core';
import { Utils } from '../../providers/Utils';
import { NativeService } from '../../providers/NativeService';
import { Helper } from '../../providers/Helper';
import { Logger } from '../../providers/Logger';
import { HttpService } from '../../providers/HttpService';
import { GlobalData } from '../../providers/GlobalData';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

    constructor(public native: NativeService,
                public helper: Helper,
                public globalData: GlobalData,
                public http: HttpService) {
        console.log(Utils.dateFormat(new Date(), 'yyyy-MM-ddTHH:mm:ss+08:00'));
        Logger.log(111);
    }


    post() {
        this.http.post('/v1/login', {
            'client_id': 'app',
            'username': 'admin',
            'password': Utils.md5('123456') // 123456 'e10adc3949ba59abbe56e057f20f883e'
        }).subscribe(res => {
            this.globalData.token = res;
            console.log(res);
        });
    }


    get() {
        this.http.get('/v1/public/user/self').subscribe(res => {
            console.log(res);
        });
    }


    articleList() {
        this.http.post('/v1/article/view/list').subscribe(res => {
            console.log(res);
        });
    }

    test() {
        this.http.get('/v1/demo/list_param', {ids: [1, 2]}).subscribe(res => {
            console.log(res);
        });
    }

    test2() {
        this.http.get('/v1/demo/map_result_get2', {param: 1}).subscribe(res => {
            console.log(res);
        });
    }

}
