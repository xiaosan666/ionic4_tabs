import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MineHomePage } from './mine-home.page';

const routes: Routes = [
    {path: '', redirectTo: '/tabs/mine/home', pathMatch: 'full'},
    {path: 'home', component: MineHomePage},
    {path: 'info', loadChildren: '../mine-info/mine-info.module#MineInfoPageModule'},
    {path: 'qr-code', loadChildren: '../mine-qr-code/mine-qr-code.module#MineQrCodePageModule'},
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MineHomePage]
})
export class MineHomePageModule {
}
