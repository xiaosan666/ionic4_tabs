import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

    constructor(public router: Router) {
    }

    ngOnInit() {
    }

    formSubmit() {
        // this.loading = true;
        this.router.navigateByUrl('/');
    }
}
