import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ModifyPasswordPage } from './modify-password.page';
import { DirectivesModule } from '../../../directives/directives.module';

const routes: Routes = [
    {
        path: '',
        component: ModifyPasswordPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes),
        DirectivesModule
    ],
    declarations: [ModifyPasswordPage]
})
export class ModifyPasswordPageModule {
}
