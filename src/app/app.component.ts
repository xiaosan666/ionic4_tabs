import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';

import {
    ActionSheetController,
    AlertController, Events,
    IonRouterOutlet,
    MenuController,
    ModalController,
    Platform,
    PopoverController
} from '@ionic/angular';
import { NativeService } from './providers/NativeService';
import { Router } from '@angular/router';
import { Helper } from './providers/Helper';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    @ViewChild(IonRouterOutlet) routerOutlet: IonRouterOutlet;
    @ViewChildren(IonRouterOutlet) routerOutlets: QueryList<IonRouterOutlet>;

    constructor(public platform: Platform,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public menuCtrl: MenuController,
                public actionSheetCtrl: ActionSheetController,
                public popoverCtrl: PopoverController,
                public router: Router,
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
            this.events.subscribe('goBack', () => {
                debugger;
                console.log(this.routerOutlet.canGoBack());
                if (this.routerOutlet && this.routerOutlet.canGoBack()) {
                    this.routerOutlet.pop();
                }
                // this.routerOutlet.forEach((outlet: IonRouterOutlet) => {
                //     console.log(this.routerOutlets.last === outlet);
                //     debugger;
                //     if (outlet && outlet.canGoBack()) {
                //         outlet.pop();
                //     } else {
                //         this.native.appMinimize();
                //     }
                // });
            });
        });
    }

    androidBackButtonAction() {
        if (!this.helper.isAndroid()) {
            return;
        }
        this.platform.backButton.subscribe(() => {
            debugger;
            try {
                this.alertCtrl.getTop().then(alert => {
                    alert && alert.dismiss();
                    return;
                });
                this.actionSheetCtrl.getTop().then(action => {
                    action && action.dismiss();
                    return;
                });
                this.popoverCtrl.getTop().then(popover => {
                    popover && popover.dismiss();
                    return;
                });
                this.modalCtrl.getTop().then(modal => {
                    modal && modal.dismiss();
                    return;
                });
                this.menuCtrl.isOpen().then(isOpen => {
                    isOpen && this.menuCtrl.close();
                    return;
                });
            } catch (error) {
            }
            this.routerOutlets.forEach((outlet: IonRouterOutlet) => {
                if (outlet && outlet.canGoBack()) {
                    outlet.pop();
                } else {
                    this.native.appMinimize();
                }
            });
        });
    }
}
