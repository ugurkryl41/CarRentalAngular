import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient:HttpClient) { }
  
  private apiUrl="https://localhost:44399/api/";

  getCustomers():Observable<ListResponseModel<Customer>>{
    let newPath=this.apiUrl+"customers/getalldetails";
    return this.httpClient.get<ListResponseModel<Customer>>(newPath);
  }

  getByUserId(id:number){
    let newPath=this.apiUrl+"customers/getbyuserid?id="+id;
    return this.httpClient.get<SingleResponseModel<Customer>>(newPath);  
  }

}
