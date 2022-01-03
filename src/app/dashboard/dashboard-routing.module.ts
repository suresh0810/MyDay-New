import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceV1Component } from './ecommerce-v1/ecommerce-v1.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductionComponent } from './production/production.component';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'production',
        component: ProductionComponent,
        data: {
          title: 'production'
        }
      },       
     
      {
        path: 'user-profile',
        component: UserProfileComponent,
        data: {
          title: 'Service Support'
        }
      },          
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }
