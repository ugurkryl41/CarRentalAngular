import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaymentService } from 'src/app/services/payment.service';

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
  ) {

  }

  ngOnInit(): void {   
    this.createPaymentCarForm();
  }

  createPaymentCarForm() {
    
    this.paymentCarForm = this.formBuilder.group({
      carId:['',Validators.required],
      customerId: ['',Validators.required],
      cartName: ['', Validators.required],
      cartNumber: ['', Validators.required],
      cartDate: ['', Validators.required],
      totalPrice: ['',Validators.required],
      paymentDate:[new Date(Date.now()),Validators.required]
    });
  }

  payment() {
    
    this.paymentCarForm.patchValue({carId:this.carIdx,customerId:this.customerIdx,totalPrice:this.pricex})        
    if (this.paymentCarForm.valid) {
      let paymentModel = Object.assign({}, this.paymentCarForm.value);
      this.paymentService.paymentAdd(paymentModel).subscribe(
        (response) => {
          this.toastrService.success('Ödeme Başarılı');
          console.log(this.carrentalform.value)
        },
        (responseError) => {
          this.toastrService.error('İşlem Başarısız');
        }
      );
    } else {
      this.toastrService.warning('Form Alanlarını Doldurunuz !!');
    }
  }
}
