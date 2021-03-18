import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[]=[];
  carImages2: CarImage[];

  dataLoaded = false;

  //imagePath: string = 'https://localhost:44399/Images/default.png';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandid']) {
        this.getCarsDetailsByBrand(params['brandid']);
      } else if (params['colorid']) {
        this.getCarsDetailsByColor(params['colorid']);
      } else {
        this.getCarsDetails();
      }
    });
    this.getImageClassAll();
  }
  getImageClassAll() {
    this.carImageService.getCarImagesAll().subscribe((response) => {
      this.carImages = response.data;       
    });  
  }

  getImageByCarId(car:Car):string{
    this.carImages2 = [];
    this.carImages.forEach((p:CarImage)=> {
      if(p.carId === car.id)
      {
        this.carImages2.push(p);
      }      
    });
    if(this.carImages2.length === 0)
    {
        return 'https://localhost:44399/Images/default.png';
    }
    return "https://localhost:44399"+this.carImages2[0].imagePath;
  }

  getCarsDetails() {
    this.carService.getCarsDetails().subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarDetailsByCarId(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsDetailsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
  getCarsDetailsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe((response) => {
      this.cars = response.data;
      this.dataLoaded = true;
    });
  }
}
