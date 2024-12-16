import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpService } from './http.service';
import { Store } from '@ngrx/store';
import { RootReducerState, getCustomerLoading, getCustomerLoaded, getCustomers, getCustomerError } from '../reducers';
import { Observable, combineLatest } from 'rxjs';
import { CustomerListRequestAction, CustomerListSuccessAction, CustomerListFailureAction, CustomerListDeleteAction, CustomerDeleteSuccessAction, CustomerDeleteFailureAction } from '../actions/customer-action';
import { CustomerInterfce } from '../modals/customer-interfce';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HandlerService {

  constructor(private apiService: ApiService, private httpService: HttpService, private store: Store<RootReducerState>) { }
  loading$ = this.store.select(getCustomerLoading)
  loaded$ = this.store.select(getCustomerLoaded)

  // Get All list
  getCustomerList(force = false):[Observable<boolean>, Observable<CustomerInterfce[]>, Observable<boolean>]{
    combineLatest([this.loading$, this.loaded$]).pipe(take(1)).subscribe((data) => {
      if((!data[0] && !data[1]) || force){
        this.store.dispatch(new CustomerListRequestAction())
        this.apiService.getAllUsers().subscribe(
          (data:any) => {
            this.store.dispatch(new CustomerListSuccessAction({data}))
          },
          (err) => {
            this.store.dispatch(new CustomerListFailureAction({err}))
          }
        )
      }
    })
    return [this.loading$, this.store.select(getCustomers), this.store.select(getCustomerError)]
  }

  // Delete user

  deleteCustomer(id:number):[Observable<boolean>, Observable<CustomerInterfce[]>, Observable<boolean>]{
    combineLatest([this.loading$, this.loaded$]).pipe(take(1)).subscribe((data) => {
      if(!data[0] && data[1]){
        this.store.dispatch(new CustomerListDeleteAction({id}))
        this.apiService.deleteUser(id).subscribe(
          (data:any) => {
            this.store.dispatch(new CustomerDeleteSuccessAction({data}))
          },
          (err) => {
            this.store.dispatch(new CustomerDeleteFailureAction({err}))
          }
        )
      }
    });
    return [this.loading$, this.store.select(getCustomers), this.store.select(getCustomerError)]
  }
}
