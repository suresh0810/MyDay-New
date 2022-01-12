import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EcommerceV1Component } from './ecommerce-v1/ecommerce-v1.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ProductionComponent } from './production/production.component';
import { FinanceComponent } from './finance/finance.component';
import { TaskComponent } from './task/task.component';

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
     {
      path: 'task',
      component: TaskComponent,
      data: {
        title: 'Task'
      }
    }, 
      {
        path: 'finance',
        component: FinanceComponent,
        data: {
          title: 'Finance'
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
