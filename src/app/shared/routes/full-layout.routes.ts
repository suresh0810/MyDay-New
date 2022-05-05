import { Routes } from '@angular/router';

//Route for content layout with sidebar, navbar and footer.

export const Full_ROUTES: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
    },            

    {
        path: 'pages',
        loadChildren: () => import('../../pages/full-pages/full-pages.module').then(m => m.FullPagesModule)

    },
    {
        path: 'ui-icons',
        loadChildren: () => import('../../ui-icons/ui-icons.module').then(m => m.UiIconsModule)

    },
    {
        path: 'ui-elements',
        loadChildren: () => import('../../ui-elements/ui-elements.module').then(m => m.UIElementsModule)
    },
    {
        path: 'components',
        loadChildren: () => import('../../components/components.module').then(m => m.ComponentsModule)
    },
  
   
    
    
];