import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userToken:boolean;

  constructor(public authService:AuthService,private localStorageService: LocalStorageService,private customerService:CustomerService) { }

  ngOnInit(): void {
    
    this.tokenCheck();

  }

  tokenCheck(){
    if(this.authService.isAuthenticated())
    {
      this.userToken = this.authService.isAuthenticated();
      this.authService.userDetailFromToken(); 
    }
  }
  
  userlogout(){
    this.localStorageService.remove("token")    
    window.location.assign('http://localhost:4200/cars');       
  }

}
