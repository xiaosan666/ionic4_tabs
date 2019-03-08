import { Component, ViewChild } from '@angular/core';

import { Events, IonRouterOutlet, Platform } from '@ionic/angular';
import { NativeService } from './providers/NativeService';
import { Helper } from './providers/Helper';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;

    constructor(public platform: Platform,
                public events: Events,
                public helper: Helper,
                public native: NativeService) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            this.native.setStatusBarStyle();
            this.native.hideSplashScreen();
            this.androidBackButtonAction();
        });
    }


    androidBackButtonAction() {
        if (!this.helper.isAndroid()) {
            return;
        }
        this.platform.backButton.subscribe(() => {
            this.events.publish('goBack');
        });
    }


}
