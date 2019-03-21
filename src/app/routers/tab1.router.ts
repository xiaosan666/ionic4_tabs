import { Routes } from '@angular/router';

export const tab1Routes: Routes = [
    {path: 'tab1/test', loadChildren: './pages/tab1/test/test.module#TestPageModule'},
    {path: 'tab1/test2/:id', loadChildren: './pages/tab1/test2/test2.module#Test2PageModule'}
];

