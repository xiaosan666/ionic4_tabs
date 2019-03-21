import { Routes } from '@angular/router';

export const demoRoutes: Routes = [
    {path: 'demo/form', loadChildren: './pages/demo/form/form.module#FormPageModule'}
];

