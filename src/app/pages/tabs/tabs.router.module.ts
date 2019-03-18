import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { Tab1Page } from '../tab1/tab1.page';
import { MinePage } from '../mine/mine.page';
import { tab1Routes } from './tab1.router';
import { demoRoutes } from './demo.router';
import { mineRoutes } from './mine.router';
import { DemoPage } from '../demo/demo.page';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {path: '', redirectTo: '/tabs/tab1', pathMatch: 'full'},
            {path: 'tab1', component: Tab1Page},
            ...tab1Routes,
            {path: 'demo', component: DemoPage},
            ...demoRoutes,
            {path: 'mine', component: MinePage},
            ...mineRoutes
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
