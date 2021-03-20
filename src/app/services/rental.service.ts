import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentCar } from '../models/rentcar';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
   
  constructor(private httpClient:HttpClient) { }

  private apiUrl = 'https://localhost:44399/api/'; 

  getRentals():Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + 'rentals/getrentaldetails';
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  getRentalsByCarId(carId:number):Observable<ListResponseModel<Rental>>{
    let newPath = this.apiUrl + 'rentals/getrentaldetailsbycarid?id='+carId;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }

  setRentalCar(rentcar:RentCar){
    let newPath=this.apiUrl+"rentals/add"     
    return this.httpClient.post(newPath,{
      "carId":rentcar.carId,
      "customerId":rentcar.customerId,
      "rentDate":rentcar.rentDate,
      "returnDate":rentcar.returnDate
    });
  }
  
}
