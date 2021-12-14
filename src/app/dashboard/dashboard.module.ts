import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EcommerceV1Component } from './ecommerce-v1/ecommerce-v1.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import{DemoMaterialModule} from '../material-module';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        ChartsModule,
        NgApexchartsModule,
        FormsModule,
        NgSelectModule,
        DemoMaterialModule,
      
    ],
    exports: [],
    declarations: [
    EcommerceV1Component,
    UserProfileComponent,               
   ],
    providers: [],
})
export class DashboardModule { }
