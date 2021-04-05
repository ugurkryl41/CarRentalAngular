import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel} from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerService } from './customer.service';
import { Subject } from 'rxjs';
import { RegisterModel } from '../models/registerModel';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  private apiUrl = 'https://localhost:44399/api/';

  userName:string;
  userId:number; 
  customerId:number;

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService, 
    private customerService:CustomerService     
  ) {

    
  }

  login(login: LoginModel) {
    let newPath = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      login
    );
  }

  register(register: RegisterModel) {
    let newPath = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      newPath,
      register
    );
  }

  async userDetailFromToken() {
    const helper = new JwtHelperService();
    let token: any = this.localStorageService.get('token');
    const decodedToken = helper.decodeToken(token);       
    let name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    this.userName = name;
    this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];  
    await this.customerService.getByUserId(this.userId).subscribe(response=>{
      this.customerId = response.data.id 
    })
        
  }
 
  isAuthenticated() {
    return this.localStorageService.checkuserlogOff('token');
  }


}
