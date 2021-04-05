import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validator,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  register(){
    if(this.registerForm.valid){
      let registerModel=Object.assign({},this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        this.toastrService.info(response.message,"Kayıt Başarılı")
        window.location.assign('http://localhost:4200/cars');
      },responseError=>{
        this.toastrService.error("Giriş Başarısız")
        if (responseError.error.ValidationErrors.length > 0) {
          for (let i = 0; i < responseError.error.ValidationErrors.length; i++) {
            this.toastrService.error(
              responseError.error.ValidationErrors[i].ErrorMessage,
              'İşlem Başarısız..!!'
            );
          }
        }
      });
    }
  }

}
