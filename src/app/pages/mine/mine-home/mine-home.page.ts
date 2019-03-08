import { Component, OnInit } from '@angular/core';
import { NativeService } from '../../../providers/NativeService';
import { Helper } from '../../../providers/Helper';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';

@Component({
    selector: 'app-mine-home',
    templateUrl: './mine-home.page.html',
    styleUrls: ['./mine-home.page.scss'],
})
export class MineHomePage implements OnInit {

    constructor(public helper: Helper,
                public router: Router,
                public events: Events,
                public native: NativeService) {
    }

    ngOnInit() {
    }

    getPictures() {
        this.native.getPictures().subscribe(result => {
            console.log(JSON.stringify(result));
        });
    }

    logout() {
        this.helper.assertIsMobile();
        this.helper.alert('提示', '确定退出吗？', () => {
            navigator['app'].exitApp();
        }, () => {
        });
    }

    login() {
        this.helper.alert('提示', '确定重新登录吗？', () => {
            this.router.navigateByUrl('/login');
        }, () => {
        });
        setTimeout(() => {
            this.events.publish('goBack');
        }, 3000);
    }

}
