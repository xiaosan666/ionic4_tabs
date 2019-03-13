import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { mergeMap } from 'rxjs/operators';
import { GlobalData } from '../../providers/GlobalData';
import { Storage } from '../../providers/Storage';
import { Helper } from '../../providers/Helper';
import { UserInfo } from '../../interfaces/UserInfo';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    loading = false;
    model = {
        username: 'test',
        password: '123456'
    };

    constructor(public nav: NavController,
                public helper: Helper,
                public auth: AuthService) {
    }

    ngOnInit() {
    }

    formSubmit() {
        this.loading = true;
        this.auth.getToken(this.model.username, this.model.password).pipe(
            mergeMap(token => {
                GlobalData.token = token;
                Storage.localStorage.set('token', token);
                return this.auth.getUserInfo();
            })
        ).subscribe((userInfo: UserInfo) => {
            this.loading = false;
            this.helper.loginSuccessHandle(userInfo);
            this.nav.navigateRoot('/');
        }, () => {
            this.loading = false;
        });
    }

    findPassword() {
        this.helper.tipDev();
    }
}
