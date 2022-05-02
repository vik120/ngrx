import { CustomerInterfce } from './../../../modals/customer-interfce';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HandlerService } from '../../../services/handler.service'; 
import { CustomerUpdateComponent } from './../customer-update/customer-update.component';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.scss']
})
export class CustomerlistComponent implements OnInit {
  customers: CustomerInterfce[] = []
  loading: boolean = false
  error: boolean = false;
  action: string = ''
  @ViewChild('customerAddEdit', { static: false }) customerAddEdit: CustomerUpdateComponent
  
  constructor(private handleService: HandlerService) { }

  ngOnInit(): void {
    this.fetchCustomers()
  }

  fetchCustomers() {
    this.action = 'loadlist'
    const userData$ = this.handleService.getCustomerList(false)
    userData$ && userData$[1].subscribe((data) => {
      this.customers = data
    })
    userData$ && userData$[0].subscribe((data) => {
      this.loading = data
    })
    userData$ && userData$[2].subscribe((data) => {
      this.error = data
    })
  }

  tryAgain() {
    if (this.action != 'deleteUser') {
      this.handleService.getCustomerList(true)
    }
  }

  deleteUser(id) {
    this.action = 'deleteUser'
    this.handleService.deleteCustomer(id) && this.handleService.deleteCustomer(id)[1].subscribe((data) => {
      this.customers = data
    })
    this.handleService.deleteCustomer(id) && this.handleService.deleteCustomer(id)[0].subscribe((data) => {
      this.loading = data
    })
    this.handleService.deleteCustomer(id) && this.handleService.deleteCustomer(id)[2].subscribe((data) => {
      this.error = data
    })
  }
  
  editUser(){
    this.customerAddEdit.isModalShown= true;
  }

}
