import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image',
  templateUrl: './car-image.component.html',
  styleUrls: ['./car-image.component.css'],
})
export class CarImageComponent implements OnInit {
  cars: Car[] = [];
  carImages: CarImage[] = [];
  urlPath: string = 'https://localhost:44399';

  constructor(
    private carImagesService: CarImageService,
    private activatedRoute: ActivatedRoute,
    private carService: CarService
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getCarImages(params['carId']);
        this.getCarDetails(params['carId']);
      }
    });
  }

  ngOnInit(): void {}

  getCarImages(carId: number) {
    this.carImagesService.getCarImages(carId).subscribe((response) => {
      this.carImages = response.data;
    });
  }

  getCarDetails(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getSliderClassName(index: Number) {
    if (index == 0) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }
}
