import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient) { }

  private apiUrl="https://localhost:44399/api/";

  getColors():Observable<ListResponseModel<Color>>{
  let newPath:string = this.apiUrl+"colors/getall"
   return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  colorAdd(color:Color):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"colors/add"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  colorUpdate(color:Color):Observable<ResponseModel>{
    let newPath:string = this.apiUrl+"colors/update"
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

}
