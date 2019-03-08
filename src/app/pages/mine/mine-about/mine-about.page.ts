import { Component, OnInit } from '@angular/core';
import { NativeService } from '../../../providers/NativeService';

@Component({
    selector: 'app-mine-about',
    templateUrl: './mine-about.page.html',
    styleUrls: ['./mine-about.page.scss'],
})
export class MineAboutPage implements OnInit {
    appInfo = {
        appName: 'ionic4test', // app name,如现场作业
        packageName: 'com.kit.ionic4test', // app包名/id,如com.kit.ionic4test
        versionNumber: '0.0.1', // app版本号,如0.0.1
        name: 'ionic4test' // ionic4test
    };

    constructor(public native: NativeService) {
    }

    ngOnInit() {
        this.native.getAppVersionInfo().subscribe(res => this.appInfo = res);
    }

    checkNewVersion() {

    }

    updateLog() {

    }

    features() {

    }

    feedBack() {

    }
}
