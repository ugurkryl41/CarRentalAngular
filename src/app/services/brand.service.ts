import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private httpClient: HttpClient ) { }

  private apiUrl="https://localhost:44399/api/";
 
  getBrands():Observable<ListResponseModel<Brand>>{
    let newPath:string=this.apiUrl+"brands/getall";
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  brandAdd(brand:Brand):Observable<ResponseModel>{    
    let newPath:string = this.apiUrl+"brands/add"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  brandUpdate(brand:Brand):Observable<ResponseModel>{    
    let newPath:string = this.apiUrl+"brands/update"
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

}
