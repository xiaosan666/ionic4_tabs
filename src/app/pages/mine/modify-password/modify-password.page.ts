import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from '../../../providers/Helper';
import { AuthService } from '../../../services/auth.service';
import { Utils } from '../../../providers/Utils';

@Component({
    selector: 'app-modify-password',
    templateUrl: './modify-password.page.html',
    styleUrls: ['./modify-password.page.scss'],
})
export class ModifyPasswordPage implements OnInit {
    loading = false;
    pswLeave; // 密码强度
    model = {
        oldPsw: '123456',
        password: '123456',
        newPassword: '123456'
    };

    constructor(public router: Router, public helper: Helper, public auth: AuthService) {
    }

    ngOnInit() {
    }

    formSubmit() {
        this.loading = true;
        this.auth.modifyPassword(this.model.oldPsw, this.model.newPassword).subscribe(res => {
            this.loading = false;
            this.helper.alert('密码修改成功', '确定后前往登录', () => {
                this.router.navigateByUrl('/login');
            });
        }, () => {
            this.loading = false;
        });
    }

    checkPass(value) {
        this.pswLeave = Utils.checkPass(value);
    }
}
