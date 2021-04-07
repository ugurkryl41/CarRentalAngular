import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl="https://localhost:44399/api/";
  constructor(private httpClient:HttpClient) { }

  getUsers():Observable<ListResponseModel<User>>{
    let newPath=this.apiUrl+"users/getall";
    return this.httpClient.get<ListResponseModel<User>>(newPath);
  }
  getUserByUserId(id:number):Observable<SingleResponseModel<User>>
  {
    let newPath=this.apiUrl+"users/getbyid?id="+id;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
