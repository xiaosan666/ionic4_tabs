import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MineQrCodePage } from './mine-qr-code.page';

const routes: Routes = [
  {
    path: '',
    component: MineQrCodePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MineQrCodePage]
})
export class MineQrCodePageModule {}
