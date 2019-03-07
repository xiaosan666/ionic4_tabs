import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
    {path: '', redirectTo: '/tabs/tab1', pathMatch: 'full'},
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {path: '', redirectTo: '/tabs/tab1', pathMatch: 'full'},
            {path: 'tab1', loadChildren: '../tab1/tab1.module#Tab1PageModule'},
            {path: 'tab2', loadChildren: '../tab2/tab2.module#Tab2PageModule'},
            {path: 'mine', loadChildren: '../mine/mine-home/mine-home.module#MineHomePageModule'}
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TabsPageRoutingModule {
}
