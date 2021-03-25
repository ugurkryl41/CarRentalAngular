import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CarImage } from '../models/carImage';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarImageService{

  apiUrl = 'https://localhost:44399/api/';

  constructor(private httpClient: HttpClient) {}

  getCarImages(carId:number):Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'carimages/getimagesbycarid?id='+carId;
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  getCarImagesAll():Observable<ListResponseModel<CarImage>>{
    let newPath = this.apiUrl + 'carimages/getall';
    return this.httpClient.get<ListResponseModel<CarImage>>(newPath);
  }

  carImageAdd(carImage:CarImage,file:any):Observable<ResponseModel>{
    const uploadData = new FormData();
    uploadData.append('Image',file,file.name)
    uploadData.append('CarId',JSON.stringify(carImage.carId))
    let newPath =  this.apiUrl+"carimages/add"; 
    return this.httpClient.post<ResponseModel>(newPath,uploadData)
  }

}
