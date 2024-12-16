import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomersComponent } from './customers.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { CustomerSingleComponent } from './customer-single/customer-single.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersComponent,
    children: [
      {
        path: '',
        redirectTo:'customers',
        pathMatch: 'full'
      },
      {
        path: 'customers',
        component: CustomerlistComponent
      },
      // {
      //   path: 'update/:id',
      //   component: CustomerUpdateComponent
      // },
      {
        path: 'single/:id',
        component: CustomerSingleComponent
      },
      {
        path: '**',
        component: CustomerlistComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
