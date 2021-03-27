import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  paymentCarForm: FormGroup;

  @Input() carrentalform: FormGroup;
  @Input() pricex: number;
  @Input() carIdx: number;
  @Input() customerIdx: number;

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService
  ) {}

  ngOnInit(): void {
    this.createPaymentCarForm();
  }

  createPaymentCarForm() {
    this.paymentCarForm = this.formBuilder.group({
      carId: ['', Validators.required],
      customerId: ['', Validators.required],
      cartName: ['', Validators.required],
      cartNumber: ['', Validators.required],
      cartDate: ['', Validators.required],
      cartCvv: ['', Validators.maxLength(3)],
      totalPrice: ['', Validators.required],
      paymentDate: [new Date(Date.now()), Validators.required],
    });
  }

  payment() {
    this.paymentCarForm.patchValue({
      carId: this.carIdx,
      customerId: this.customerIdx,
      totalPrice: this.pricex,
    });
    if (this.paymentCarForm.valid) {
      let paymentModel = Object.assign({}, this.paymentCarForm.value);
      this.paymentService.paymentAdd(paymentModel).subscribe(
        (response) => {
          if (response.success) {
            let rentalModel = Object.assign({}, this.carrentalform.value);
            this.rentalService.carRentAdd(rentalModel).subscribe(
              (res) => {
                this.toastrService.success('Ödeme Başarılı');
                function refreshx() {
                  window.location.assign('http://localhost:4200/cars');
                }
                window.setInterval(refreshx, 1000);
              },
              (resError) => {
                if (resError.error.ValidationErrors.length > 0) {
                  for (
                    let i = 0;
                    i < resError.error.ValidationErrors.length;
                    i++
                  ) {
                    this.toastrService.error(
                      resError.error.ValidationErrors[i].ErrorMessage,
                      'İşlem Başarısız..!!'
                    );
                  }
                }
              }
            );
          }
        },
        (responseError) => {
          if (responseError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < responseError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                responseError.error.ValidationErrors[i].ErrorMessage,
                'İşlem Başarısız..!!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning('Form Alanlarını Doldurunuz !!');
    }
  }
}
