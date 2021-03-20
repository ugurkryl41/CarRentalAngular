import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Rental } from 'src/app/models/rental';
import { RentCar } from 'src/app/models/rentcar';
import { RentalService } from 'src/app/services/rental.service';
import {FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms'

@Component({
  selector: 'app-car-rent',
  templateUrl: './car-rent.component.html',
  styleUrls: ['./car-rent.component.css'],
})
export class CarRentComponent implements OnInit {
  returnDate: Date;
  rentcar: RentCar;
  rentDate: Date;
  datecheck = false;

  @Input() data: number;
  @Input() datarental: Rental;

  constructor(
    private rentalService: RentalService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  getRentMinDate() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  getReturnMinDate() {
    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date.toISOString().slice(0, 10);
  }

  rentacar() {
    if (!this.datarental) {
      if (
        new Date(this.rentDate) >= new Date(Date.now()) &&
        new Date(this.returnDate) > new Date(Date.now())
      ) {
        console.log('Ödeme yönlendirliyirosunuzagljkahgjka');
        this.datecheck = true;
      } else {
        console.log('tarih seç ulan');
      }
    } else {
      if (
        new Date(this.datarental.returnDate) < new Date(this.rentDate) &&
        this.rentDate < this.rentDate
      ) {
        console.log('Ödemeye gidiliyor');
        this.datecheck = true;
      } else {
        console.log('fuck');
      }
    }
  }

  payment() {
    if (true) {
      this.rentalcar()
      this.toastrService.success('Kiralama işlemi tamamlandı.');
      console.log('Kiralandı..');
    }
  }

  rentalcar() {

    this.rentcar = {
      carId: parseInt(this.data.toString()),
      customerId: 2002,
      rentDate: new Date(this.rentDate),
      returnDate: new Date(this.returnDate),
    };

    let rentcarobject = Object.assign({},this.rentcar  )
    
    
    this.rentalService.setRentalCar(rentcarobject).subscribe((data) => {
      console.log(data);
    });
  }
}
