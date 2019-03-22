import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
    selector: 'app-test2',
    templateUrl: './test2.page.html',
    styleUrls: ['./test2.page.scss'],
})
export class Test2Page implements OnInit {

    constructor(private route: ActivatedRoute,
                public router: Router,
                public nav: NavController) {
    }

    ngOnInit() {
        const snapshot = this.route.snapshot;
        const params = snapshot.params;
        const queryParams = snapshot.queryParams;
        console.log('params:', params, '   queryParams:', queryParams);
        this.route.params.subscribe(res => {
            console.log(res);
        });
        this.route.queryParams.subscribe(res => {
            console.log(res);
        });
    }

    back() {
        this.nav.pop();
    }

}
