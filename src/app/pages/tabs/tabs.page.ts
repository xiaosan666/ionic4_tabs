import { Component, OnInit, ViewChild } from '@angular/core';
import {
    ActionSheetController,
    AlertController,
    Events,
    IonTabs,
    MenuController,
    ModalController, Platform,
    PopoverController
} from '@ionic/angular';
import { Helper } from '../../providers/Helper';
import { NativeService } from '../../providers/NativeService';
import { logger } from 'codelyzer/util/logger';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
    @ViewChild('tabs') tabs: IonTabs;

    constructor(public platform: Platform,
                public events: Events,
                public helper: Helper,
                public native: NativeService,
                public alertCtrl: AlertController,
                public modalCtrl: ModalController,
                public menuCtrl: MenuController,
                public actionSheetCtrl: ActionSheetController,
                public popoverCtrl: PopoverController) {

    }

    ngOnInit() {
        this.platform.backButton.subscribe(this.androidBackButtonHandle);
        this.events.subscribe('goBack', () => {
            this.androidBackButtonHandle();
        });
    }

    async androidBackButtonHandle() {
        debugger;
        const canGoBack = this.tabs.outlet.canGoBack();
        console.log('canGoBack1:', this.tabs.outlet.canGoBack());
        try {
            const alert = await this.alertCtrl.getTop();
            if (alert) {
                alert.dismiss();
                return;
            }
            const action = await this.actionSheetCtrl.getTop();
            if (action) {
                action.dismiss();
                return;
            }
            const popover = await this.popoverCtrl.getTop();
            if (popover) {
                popover.dismiss();
                return;
            }
            const modal = await this.modalCtrl.getTop();
            if (modal) {
                modal.dismiss();
                return;
            }
            const isOpen = await this.menuCtrl.isOpen();
            if (isOpen) {
                this.menuCtrl.close();
                return;
            }
            if (!canGoBack) {
                // this.native.appMinimize();
                console.log('最小化');
            }
            if (this.tabs.outlet.canGoBack()) {
                this.tabs.outlet.pop();
            }
            console.log('canGoBack2:', this.tabs.outlet.canGoBack());
        } catch (error) {
        }
    }
}
