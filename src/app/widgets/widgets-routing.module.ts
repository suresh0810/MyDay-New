import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaticWidgetsComponent } from './static-widgets/static-widgets.component';
import { DataWidgetsComponent } from './data-widgets/data-widgets.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'static-widgets',
        component: StaticWidgetsComponent,
        data: {
          title: 'Static Widgets'
        }
      },
      {
        path: 'data-widgets',
        component: DataWidgetsComponent,
        data: {
          title: 'Data Widgets'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WidgetsRoutingModule { }
