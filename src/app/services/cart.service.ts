import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  apiUrl = 'https://localhost:44399/api/'; 
  constructor(private httpClient: HttpClient) { }

  cartGetAll(customerId:number):Observable<ListResponseModel<Cart>>{
    let newPath:string=this.apiUrl+"carts/getallbyid?id="+customerId;
    return this.httpClient.get<ListResponseModel<Cart>>(newPath);
  }

}
