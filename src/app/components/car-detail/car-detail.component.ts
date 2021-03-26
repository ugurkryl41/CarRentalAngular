import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDto } from 'src/app/models/car-dto';
import { CarImage } from 'src/app/models/carImage';
import { Rental } from 'src/app/models/rental';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  dataCarId:number

  carx:CarDto = {brandName:"",modelYear:-1,description:"",dailyPrice:-1,colorName:"",id:-1}

  rentalscar:Rental[]
  carImages: CarImage[] = [];

  urlPath: string = 'https://localhost:44399';

  constructor( private activatedRoute: ActivatedRoute,
    private carService: CarService,    
    private rentalService: RentalService,
    private carImagesService: CarImageService,) 
    {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carid']) {
        this.getCarDetails(params['carid'])
        this.getCarImages(params['carid']);     
        this.dataCarId = params['carid'];       
      }
    });

   }

  ngOnInit(): void {
     this.getRentalDetails(this.dataCarId)
  }

  getRentalDetails(carId: number) {    
    this.rentalService.getRentalsByCarId(carId).subscribe((response) => {      
        this.rentalscar = response.data
        console.log(response.data)
    });
  }


  getCarDetails(carId: number) {     
     this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
        this.carx=response.data
     })
  }

  getCarImages(carId: number) {
    this.carImagesService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  returnDateCheck(rental: Rental): string {
    let date: Date = new Date();
    if (rental.returnDate.toString() < date.toJSON().toString()) {
      return 'table-secondary'
    }
    return 'table-danger';
  }

}
