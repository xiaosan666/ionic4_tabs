import { Component, OnInit } from '@angular/core';
import { Events } from '@ionic/angular';

@Component({
    selector: 'app-test',
    templateUrl: './test.page.html',
    styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {

    constructor(public events: Events) {
    }

    ngOnInit() {
    }

    goBack() {
        this.events.publish('goBack');
    }
}
