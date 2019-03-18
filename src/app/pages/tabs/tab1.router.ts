import { Routes } from '@angular/router';

export const tab1Routes: Routes = [
    {path: 'tab1/test', loadChildren: '../tab1/test/test.module#TestPageModule'}
];

