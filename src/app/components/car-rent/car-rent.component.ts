import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/car-dto';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css'],
})
export class CarRentComponent implements OnInit {
  responseVerify: boolean = false;

  rentalCarForm: FormGroup;
  paymentCarForm: FormGroup;

  
  rentCarId:number = -1;
  rentcarCustomerId: number = 2002;

  paymentboard: boolean = false;
  rentboard: boolean = true;

  totalfiyat: number;

  rentcar: CarDto;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private carService: CarService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carid']) {
         this.getCarDto(params['carid'])
      }
    });
  }

  ngOnInit(): void {
    this.createRentalCarForm();
    this.createPaymentCarForm();
  }

  getCarDto(carid:number){
      this.carService.getCarDetailsByCarId(carid).subscribe(response => {
        this.rentcar = response.data
        this.rentCarId = this.rentcar.id
      })
  }

  createRentalCarForm() {
    this.rentalCarForm = this.formBuilder.group({
      carId: [this.rentCarId, Validators.required],
      customerId: [this.rentcarCustomerId, Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  createPaymentCarForm() {
    this.paymentCarForm = this.formBuilder.group({
      carId: [this.rentCarId, Validators.required],
      customerId: [this.rentcarCustomerId, Validators.required],
      cartName: ['', Validators.required],
      cartNumber: ['', Validators.required],
      cartDate: ['', Validators.required],
      totalPrice: [this.totalfiyat, Validators.required],
      paymentDate: [new Date(Date.now()), Validators.required],
    });
  }

  createRent() {
    if (!this.rentalCarForm.valid) {
      this.toastrService.error('Tarih seçiniz');
      this.paymentboard = false;
    } else {
      if (
        this.rentalCarForm.controls['rentDate'].value >=
          new Date(Date.now()).toISOString() &&
        this.rentalCarForm.controls['returnDate'].value >
          this.rentalCarForm.controls['rentDate'].value
      ) {
        
        let rent = new Date(this.rentalCarForm.controls['rentDate'].value).getTime(); 
        let returnx = new Date(this.rentalCarForm.controls['returnDate'].value).getTime();       
        this.totalfiyat = (Math.abs(rent-returnx)/(1000*60*60*24)) * this.rentcar.dailyPrice;
        
        this.paymentboard = true;
        this.rentboard = false;
      } else {
        this.toastrService.error('Tarihleri Değiştiriniz');
      }
    }
  }

  payment() {
    if (this.paymentCarForm.valid) {
      // Önce Payment sonra kiralama postu çağır !!!!!..............................
    } else {
    }
  }
}

// this.toastrService.success('Ödeme gerçekleştirildi');
//           function refreshx() {
//             window.location.href = 'http://localhost:4200/';
//           }
//           window.setInterval(refreshx, 1000);
