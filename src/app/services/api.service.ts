import { CustomerInterfce } from './../modals/customer-interfce';
import { HttpService } from './http.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpService: HttpService) { }

  getAllUsers() : Observable<CustomerInterfce[]>{
    return this.httpService.getData('users').pipe(
      map((data) => {
        return data as CustomerInterfce[]
      })
    )
  }

  deleteUser(id): Observable<CustomerInterfce[]>{
    return this.httpService.deleteData('users/'+id).pipe(
      map((data) => {
        return data as CustomerInterfce[]
      })
    )
  }

  getSingleUser(id): Observable<CustomerInterfce>{
    return this.httpService.getData('users/'+id).pipe(
      map((data) => {
        return data as CustomerInterfce
      })
    )
  }
}
