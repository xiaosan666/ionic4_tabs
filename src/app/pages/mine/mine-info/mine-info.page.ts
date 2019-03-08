import { Component, OnInit } from '@angular/core';
import { AlertController, Events } from '@ionic/angular';
import { NativeService } from '../../../providers/NativeService';
import { Helper } from '../../../providers/Helper';

@Component({
    selector: 'app-mine-info',
    templateUrl: './mine-info.page.html',
    styleUrls: ['./mine-info.page.scss'],
})
export class MineInfoPage implements OnInit {

    user: any = {};

    constructor(public alertController: AlertController,
                public events: Events,
                public helper: Helper,
                public native: NativeService) {
        this.user = {
            realName: '小军617',
            sex: 1,
            username: '18688498342'
        };
    }

    ngOnInit() {
    }

    updateAvatar() {
        this.native.getPictures().subscribe(result => {
            console.log(result);
        });
    }

    async updateRealName() {
        const alert = await this.alertController.create({
            header: '请输入姓名',
            inputs: [
                {
                    name: 'fullName',
                    type: 'text',
                    value: this.user.realName,
                    placeholder: '请输入姓名'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                }, {
                    text: '确定',
                    handler: (data) => {
                        this.user.realName = data.fullName;
                    }
                }
            ]
        });

        await alert.present();
    }

    async updateSex() {
        const alert = await this.alertController.create({
            header: '选择性别',
            inputs: [
                {
                    name: 'sex',
                    type: 'radio',
                    label: '男',
                    value: '1',
                    checked: true
                },
                {
                    name: 'sex',
                    type: 'radio',
                    label: '女',
                    value: '2'
                }
            ],
            buttons: [
                {
                    text: '取消',
                    role: 'cancel'
                }, {
                    text: '确定',
                    handler: (data) => {
                        this.user.sex = data;
                    }
                }
            ]
        });

        await alert.present();
    }
}
