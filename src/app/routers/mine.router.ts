import { Routes } from '@angular/router';

export const mineRoutes: Routes = [
    {path: 'mine/info', loadChildren: './pages/mine/mine-info/mine-info.module#MineInfoPageModule'},
    {path: 'mine/qr-code', loadChildren: './pages/mine/mine-qr-code/mine-qr-code.module#MineQrCodePageModule'},
    {path: 'mine/about', loadChildren: './pages/mine/mine-about/mine-about.module#MineAboutPageModule'},
    {path: 'mine/modify-password', loadChildren: './pages/mine/modify-password/modify-password.module#ModifyPasswordPageModule'}
];

