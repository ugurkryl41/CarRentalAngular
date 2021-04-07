import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userToken: boolean;
  
  
  constructor(
    public authService: AuthService,
    private localStorageService: LocalStorageService    
  ) {
   
  }

  ngOnInit(): void {
    this.tokenCheck();
    
  }

  tokenCheck() {
    if (this.authService.isAuthenticated()) {
      this.userToken = this.authService.isAuthenticated();
      this.authService.userDetailFromToken();   
    }
  }

  userlogout() {
    this.localStorageService.remove('token');
    window.location.assign('http://localhost:4200/cars');
  }
}
