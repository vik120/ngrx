import { ApiService } from './../../services/api.service';
import { HttpService } from './../../services/http.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { HttpClientModule } from '@angular/common/http';
import { HandlerService } from 'src/app/services/handler.service';
import { SharedModule } from 'src/app/component/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerSingleComponent } from './customer-single/customer-single.component';


@NgModule({
  declarations: [
    CustomersComponent, 
    CustomerlistComponent, 
    CustomerUpdateComponent, 
    CustomerSingleComponent
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    HttpClientModule,
    SharedModule, 
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    HttpService,
    ApiService,
    HandlerService
  ]
})
export class CustomersModule { }
