import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ColorResponseModel } from '../models/colorResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  constructor(private httpClient:HttpClient) { }

  private apiUrl="https://localhost:44399/api/colors/getall";
  getColors():Observable<ColorResponseModel>{
   return this.httpClient.get<ColorResponseModel>(this.apiUrl);
  }
}
