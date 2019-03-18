import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs.router.module';

import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { DemoPage } from '../demo/demo.page';
import { MinePage } from '../mine/mine.page';

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule
    ],
    declarations: [TabsPage, Tab1Page, DemoPage, MinePage]
})
export class TabsPageModule {
}
