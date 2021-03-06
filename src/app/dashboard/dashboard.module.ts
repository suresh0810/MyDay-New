
import { NgModule } from '@angular/core';
import { HighchartsChartModule } from 'highcharts-angular';
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
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ProductionComponent } from './production/production.component';
import { FinanceComponent } from './finance/finance.component';
import { TaskComponent } from './task/task.component';
import { ReactiveFormsModule } from '@angular/forms';

import { SumPipeModule } from './pipe/sum.pipe';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule,  } from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule} from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { ColorPickerModule } from 'ngx-color-picker';
import { DailytrackerComponent } from './dailytracker/dailytracker.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { SettingsComponent } from './settings/settings.component';
import { NotepadeComponent } from './notepade/notepade.component';
import { NotepadComponent } from './notepad/notepad.component';
import { DailytrackerallComponent } from './dailytrackerall/dailytrackerall.component';
import { UiSwitchModule } from 'ngx-ui-switch';
import { LightboxModule } from 'ngx-lightbox';
import { NgImageFullscreenViewModule } from 'ng-image-fullscreen-view';



@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DashboardRoutingModule,       
        NgbModule,
        ChartsModule,
        NgApexchartsModule,
        ReactiveFormsModule,
        NgSelectModule,
        DemoMaterialModule,
        Ng2SearchPipeModule,
        MatToolbarModule,
        MatTabsModule,       
        MatFormFieldModule,
        MatInputModule,
        ColorPickerModule, 
        MatNativeDateModule,
        MatDatepickerModule,
        UiSwitchModule,
        LightboxModule,
        NgImageFullscreenViewModule
        

      
    ],
    exports: [],
    declarations: [
    EcommerceV1Component,
    UserProfileComponent,
    ProductionComponent,
    FinanceComponent,
    TaskComponent,
    DailytrackerComponent,
    ExpensesComponent,
    SettingsComponent,
    NotepadeComponent,
    NotepadComponent,  
               
   ],
    providers: [SumPipeModule],
})
export class DashboardModule { }
