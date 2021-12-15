import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceV1Component } from './ecommerce-v1/ecommerce-v1.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'ecommerce-v1',
        component: EcommerceV1Component,
        data: {
          title: 'E-Commerce V1'
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
