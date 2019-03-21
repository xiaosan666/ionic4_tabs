import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
import { Tab1Page } from './pages/tab1/tab1.page';
import { tab1Routes } from './pages/tabs/tab1.router';
import { DemoPage } from './pages/demo/demo.page';
import { demoRoutes } from './pages/tabs/demo.router';
import { MinePage } from './pages/mine/mine.page';
import { mineRoutes } from './pages/tabs/mine.router';

const routes: Routes = [
    // {path: '', loadChildren: './pages/tabs/tabs.module#TabsPageModule'},
    {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
    },
    {
        path: 'tabs',
        component: TabsPage,
        children: [
            {path: 'tab1', component: Tab1Page},
            ...tab1Routes,
            {path: 'demo', component: DemoPage},
            ...demoRoutes,
            {path: 'mine', component: MinePage},
            ...mineRoutes
        ]
    },
    {path: 'login', loadChildren: './pages/login/login.module#LoginPageModule'},
    {path: 'register', loadChildren: './pages/login/register/register.module#RegisterPageModule'}
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
