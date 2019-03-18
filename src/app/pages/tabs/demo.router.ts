import { Routes } from '@angular/router';

export const demoRoutes: Routes = [
    {path: 'demo/form', loadChildren: '../demo/form/form.module#FormPageModule'}
];

