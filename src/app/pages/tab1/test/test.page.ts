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
        this.route.queryParams.subscribe(res => {
            debugger;
        });

        const r = this.route;
        debugger;
    }

    back() {
        this.nav.pop();
    }

    back2() {
        this.router.navigate(['/tabs/tab1'], {queryParams: {page: 1, size: 10}});
        // this.router.navigateByUrl('/tabs/tab1');
    }
}
