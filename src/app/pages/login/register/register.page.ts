import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { Helper } from '../../../providers/Helper';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
    loading = false;
    model = {
        realname: '张三',
        mobileNumber: '18688888888',
        username: 'zhansan',
        password: '123456',
        newPassword: '123456'
    };

    constructor(public router: Router, public helper: Helper, public auth: AuthService) {
    }

    ngOnInit() {
    }

    formSubmit() {
        this.loading = true;
        this.auth.register(this.model).subscribe(res => {
            this.loading = false;
            this.helper.alert('注册成功', '确定后前往登录', () => {
                this.router.navigateByUrl('/login');
            });
        }, () => {
            this.loading = false;
        });
    }
}
