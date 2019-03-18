import { Component, OnInit } from '@angular/core';
import { Events, NavController } from '@ionic/angular';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    constructor(public events: Events, public nav: NavController) {
    }

    ngOnInit() {
    }

    back() {
        this.nav.pop();
    }
}
