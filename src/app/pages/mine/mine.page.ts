import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Events } from '@ionic/angular';
import { Helper } from '../../providers/Helper';
import { NativeService } from '../../providers/NativeService';

@Component({
    selector: 'app-mine',
    templateUrl: './mine.page.html',
    styleUrls: ['./mine.page.scss'],
})
export class MinePage implements OnInit {

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
        this.router.navigateByUrl('/login');
    }

}
