import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

import { DashboardRoutingModule } from "./dashboard-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EcommerceV1Component } from './ecommerce-v1/ecommerce-v1.component';
import { EcommerceV2Component } from './ecommerce-v2/ecommerce-v2.component';
import { HumanResourcesComponent } from './human-resources/human-resources.component';
import { DigitalMarketingComponent } from './digital-marketing/digital-marketing.component';
import { PropertyListingComponent } from './property-listing/property-listing.component';
import { LogisticsComponent } from './logistics/logistics.component';
import { HealthcareComponent } from './healthcare/healthcare.component';
import { ServiceSupportComponent } from './service-support/service-support.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import{DemoMaterialModule} from '../material-module';

@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        NgbModule,
        ChartsModule,
        NgApexchartsModule,
        FormsModule,
        NgSelectModule,
        DemoMaterialModule
    ],
    exports: [],
    declarations: [
    EcommerceV1Component,
    EcommerceV2Component,
    HumanResourcesComponent,
    DigitalMarketingComponent,
    PropertyListingComponent,
    LogisticsComponent,
    HealthcareComponent,
    ServiceSupportComponent,
   ],
    providers: [],
})
export class DashboardModule { }
