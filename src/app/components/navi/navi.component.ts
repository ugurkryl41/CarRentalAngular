import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css']
})
export class NaviComponent implements OnInit {

  userToken:boolean;

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    
    this.tokenCheck();

  }

  tokenCheck(){
    if(this.authService.isAuthenticated())
    {
      this.userToken = this.authService.isAuthenticated();
    }
  }
  
  userlogout(){
    localStorage.clear();
    window.location.assign('http://localhost:4200/cars');
  }

}
