import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseurl = 'https://fakestoreapi.com/'
  AUTH_TOKEN = 'auth_token';

  constructor(private http: HttpClient) { }

  // Get Data
  getData(url:string, params?:any):Observable<any>{
    const data = {params, headers: this.getAuthHeader()}
    return this.http.get(this.baseurl+url, params).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  // Delete
  deleteData(url:string, param?:any):Observable<any>{
    return this.http.delete(this.baseurl+url).pipe(
      catchError(this.errorHandler.bind(this))
    )
  }

  errorHandler(response:any){
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      // auth token delete
      // redirect login page
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === 'isTrusted') {
      // this will occur when not connected to internet
    } else {
      message = key + ' : ' + message;
    }
    // call snackbar and show error with message
    return throwError({messages: message, error});
  }

  private getAuthHeader(): { [header: string]: string | string[]; } {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`,
      'Access-Control-Allow-Origin': '*'
    };
  }
}
