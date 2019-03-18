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
        this.platform.backButton.subscribe(() => {
            this.androidBackButtonHandle();
        });
    }

    async androidBackButtonHandle() {
        const tabsCanGoBack = this.tabs.outlet.canGoBack();
        const tabsParentCanGoBack = this.tabs.outlet.parentOutlet.canGoBack();
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
            if (!tabsCanGoBack && !tabsParentCanGoBack) {
                this.native.appMinimize();
            }
        } catch (error) {
        }
    }
}
