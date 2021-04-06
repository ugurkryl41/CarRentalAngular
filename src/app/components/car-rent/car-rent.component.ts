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
import { AuthService } from 'src/app/services/auth.service';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css'],
})
export class CarRentComponent implements OnInit {
  paymentSide: boolean = false;
  rentalSide: boolean = true;

  rentalCarForm: FormGroup;
  customerForm: FormGroup;

  totalfiyat: number;
  rentCarId: number;
  rentcar: CarDto;

  customercheck: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private rentalService: RentalService,
    public authService: AuthService,
    private customerService: CustomerService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carid']) {
        this.getCarDto(params['carid']);
      }
    });
  }

  ngOnInit(): void {
    this.createRentalCarForm();
    this.createCustomerForm();
  }

  getCarDto(carid: number) {
    this.carService.getCarDetailsByCarId(carid).subscribe((response) => {
      this.rentcar = response.data;
      this.rentCarId = response.data.id;
    });
  }

  createRentalCarForm() {
    this.rentalCarForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      rentDate: ['', Validators.required],
      returnDate: ['', Validators.required],
    });    
    this.customerService.getByUserId(this.authService.userId).subscribe(res=>{
      if(res.data === null)
      {
        this.customercheck = true;
      }
    })
  }

  createCustomerForm(){
    this.customerForm = this.formBuilder.group({
      userId: ['', Validators.required],
      companyName: ['', Validators.required],
    });
  }

  createRent() {
    if (this.authService.customerId !== undefined) {
      this.rentalCarForm.patchValue({
        carId: this.rentCarId,
        customerId: parseInt(this.authService.customerId.toString()),
      });

      let datacheckModel = Object.assign({}, this.rentalCarForm.value);

      this.rentalService.rentalDateCheck(datacheckModel).subscribe(
        (response) => {
          if (response.success) {
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
        },
        (responseError) => {
          this.toastrService.warning('Seçilen Tarihler Arasında Araç Kiralık');
        }
      );
    }
  }

  createCustomer() {
    this.customerForm.patchValue({
      userId: parseInt(this.authService.userId.toString())

    });
    if (this.customerForm.valid) {
      
      let customerModel = Object.assign({}, this.customerForm.value);
      console.log(customerModel)
      this.customerService.setCustomer(customerModel).subscribe(
        (response) => {
          this.customercheck = false;
          window.location.reload();
        },
        (responseError) => {
          this.toastrService.warning('Müşteri kaydı işlemi başarısız ..!!!');
        }
      );
    }
  }
}
