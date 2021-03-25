import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarDto } from '../models/car-dto';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  apiUrl = 'https://localhost:44399/api/'; 

  constructor(private httpClient: HttpClient) {}

  carAdd(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/add"
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  carUpdate(car:Car):Observable<ResponseModel>{
    let newPath = this.apiUrl+"cars/update"
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  getCarsDetails(): Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'cars/getcardetails';
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarDetailsByCarId(carId:number){
    let newPath = this.apiUrl + 'cars/getbycarid?id='+carId;
    return this.httpClient.get<SingleResponseModel<CarDto>>(newPath);
  }

  getCarDetailsByBrandColor(brandId:number,colorId:number): Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbybrandcolor?brandid='+brandId+'&&colorid='+colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }

  getCarsByBrand(brandId: number): Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbybrandid?id=' + brandId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }
  getCarsByColor(colorId: number): Observable<ListResponseModel<CarDto>> {
    let newPath = this.apiUrl + 'cars/getcardetailsbycolorid?id=' + colorId;
    return this.httpClient.get<ListResponseModel<CarDto>>(newPath);
  }  
}
