import { Component, OnInit } from '@angular/core';
import { Events, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    constructor(public events: Events,
                public nav: NavController,
                private route: ActivatedRoute,
                public router: Router) {
    }

    ngOnInit() {
        const queryParams = this.route.snapshot.queryParams;
        console.log(queryParams);
        this.route.queryParams.subscribe(res => {
            console.log(queryParams);
        });
    }

    back() {
        this.nav.pop();
    }

}
