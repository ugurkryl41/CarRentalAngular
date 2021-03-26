import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/car-dto';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css'],
})
export class CarRentComponent implements OnInit {

  paymentSide:boolean = false;
  rentalSide:boolean = true;

  rentalCarForm: FormGroup;

  totalfiyat: number;
  rentCarId: number;  
  rentcarCustomerId: number = 2002;

  rentcar: CarDto;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carid']) {
        this.getCarDto(params['carid']);
      }
    });
  }

  ngOnInit(): void {
    this.createRentalCarForm();
  }

  getCarDto(carid: number) {
    this.carService.getCarDetailsByCarId(carid).subscribe((response) => {
      this.rentcar = response.data;
      this.rentCarId = response.data.id
    });
  }

  createRentalCarForm() {
    this.rentalCarForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });
  }

  createRent() {
    this.rentalCarForm.patchValue({carId:this.rentCarId,customerId:this.rentcarCustomerId})
    if (!this.rentalCarForm.valid) {
      this.toastrService.warning('Tarih seçiniz');
    } else {
      if (
        this.rentalCarForm.controls['rentDate'].value >=
          new Date(Date.now()).toISOString() &&
        this.rentalCarForm.controls['returnDate'].value >
          this.rentalCarForm.controls['rentDate'].value
      ) {
        let rent = new Date(
          this.rentalCarForm.controls['rentDate'].value
        ).getTime();
        let returnx = new Date(
          this.rentalCarForm.controls['returnDate'].value
        ).getTime();
        this.totalfiyat =
          (Math.abs(rent - returnx) / (1000 * 60 * 60 * 24)) *
          this.rentcar.dailyPrice;

        this.paymentSide = true;
        this.rentalSide = false;

      } else {
        this.toastrService.warning('Tarihleri Değiştiriniz');
      }
    }
  }
}
