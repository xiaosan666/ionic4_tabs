import { Component, OnInit } from '@angular/core';
import { Utils } from '../../providers/Utils';
import { NativeService } from '../../providers/NativeService';
import { Helper } from '../../providers/Helper';
import { Logger } from '../../providers/Logger';
import { HttpService } from '../../providers/HttpService';
import { GlobalData } from '../../providers/GlobalData';
import { Encrypt } from '../../providers/Encrypt';
import { Events, NavController } from '@ionic/angular';
import { Router } from '@angular/router';

declare var AlloyLever;

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

    constructor(public native: NativeService,
                public helper: Helper,
                public events: Events,
                public router: Router,
                public nav: NavController,
                public http: HttpService) {
        console.log(Utils.dateFormat(new Date(), 'yyyy-MM-ddTHH:mm:ss+08:00'));
        Logger.log(111);
    }

    ngOnInit() {
        AlloyLever.config({
            cdn: '//s.url.cn/qqun/qun/qqweb/m/qun/confession/js/vconsole.min.js',
            reportUrl: '//a.qq.com',
            reportPrefix: 'qun',
            reportKey: 'msg',
            otherReport: {
                uin: 491862102
            },
            entry: '#entry'
        });
    }

    post() {
        this.http.post('/v1/login', {
            'client_id': 'app',
            'username': 'admin',
            'password': Encrypt.md5('123456') // 123456 'e10adc3949ba59abbe56e057f20f883e'
        }).subscribe(res => {
            GlobalData.token = res;
            console.log(res);
        });
    }


    test() {
        // this.nav.navigateForward('/tabs/tab1/test?page=1&size=10');
        this.router.navigateByUrl('/tabs/tab1/test?page=1&size=10');
    }

    test2() {
        this.router.navigate(['/tabs/tab1/test2', 2], {queryParams: {page: 1, size: 10}});
    }

}
