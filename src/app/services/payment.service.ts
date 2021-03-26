import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:44399/api/';
  constructor(private httpClient:HttpClient) { 
    
  }

  paymentAdd(payment:Payment){

    let newPath= this.apiUrl+"pays/add";   
    return this.httpClient.post<ResponseModel>(newPath,payment)
    
  }
}
