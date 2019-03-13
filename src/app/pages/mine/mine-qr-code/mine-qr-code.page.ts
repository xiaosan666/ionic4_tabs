import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../providers/Helper';
import { NativeService } from '../../../providers/NativeService';
import { Utils } from '../../../providers/Utils';

@Component({
    selector: 'app-mine-qr-code',
    templateUrl: './mine-qr-code.page.html',
    styleUrls: ['./mine-qr-code.page.scss'],
})
export class MineQrCodePage implements OnInit {
    qrCodeUrl = '';
    loading: Boolean = false;
    shareBase64: string = null;

    constructor(public helper: Helper, public native: NativeService) {
    }

    ngOnInit() {
        /**
         * 在线生成二维码两种方式
         * 1：http://tool.kd128.com/tool/qrcode.html (可以添加头像)
         * 2：http://mobile.qq.com/qrcode?width=200&url=ddfd (大厂出品，稳定多年)
         * 本文采用第一种，由于需要把此二维码用canvas生成base64字符串，直接使用上述连接会存在跨域问题
         * 所以我在我的nginx服务器上配置了代理，并允许跨域
         */
        const text = encodeURIComponent('18688498342');
        const logo = encodeURIComponent('https://yanxiaojun617.com/fileService/file/test/avatar.png');
        this.qrCodeUrl = `https://yanxiaojun617.com/qrcode/?w=200&text=${text}&logo=${logo}`;
    }

    share() {
        if (this.shareBase64) {
            this.native.share(null, this.shareBase64);
            return;
        }
        this.loading = true;
        Utils.convertImgToBase64(this.qrCodeUrl, shareBase64 => {
            this.shareBase64 = shareBase64;
            this.native.share(null, shareBase64);
            this.loading = false;
        }, 200, 200);
    }

    save() {
        this.loading = true;
        this.native.savePicture(this.shareBase64 || this.qrCodeUrl).subscribe(res => {
            this.loading = false;
            this.helper.toast('保存成功');
        });
    }
}
