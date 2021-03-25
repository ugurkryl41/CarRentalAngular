import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { CarDto } from 'src/app/models/car-dto';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: CarDto[] = [];

  colors: Color[];
  brands: Brand[];

  carsImages: CarImage[] = [];
  carImages: CarImage[];

  dataLoaded = true;

  brandText: Brand = { id: -1, brandName: 'Marka Seçiniz' };
  colorText: Color = { id: -1, colorName: 'Renk Seçiniz' };


  imagePaththum: string = 'https://localhost:44399/Images/default.png';

  constructor(
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandid'] != 2002 && params['colorid'] != 2002) {
        if (params['brandid']) {
          this.getCarsDetailsByBrand(params['brandid']);
        } else if (params['colorid']) {
          this.getCarsDetailsByColor(params['colorid']);
        } else {
          this.getCarsDto();
        }
      } else {
        this.getCarsDto();
      }
    });
    this.getcarsImages();
    this.getBrands();
    this.getColors();
  }

  getcarsImages() {
    this.carImageService.getCarImagesAll().subscribe((data) => {
      this.carsImages = data.data;
    });
  }

  carimagethum(car: CarDto): string {
    this.carImages = [];
    this.carsImages.forEach((p: CarImage) => {
      if (p.carId === car.id) {
        this.carImages.push(p);
      }
    });
    if (this.carImages.length === 0) {
      return this.imagePaththum;
    }
    return 'https://localhost:44399' + this.carImages[0].imagePath;
  }

  getCarsDto() {
    this.carService.getCarsDetails().subscribe((data) => {
      this.cars = data.data;
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

  getBrands() {
    this.brandService.getBrands().subscribe((data) => {
      this.brands = data.data;
    });
  }
  getColors() {
    this.colorService.getColors().subscribe((data) => {
      this.colors = data.data;
    });
  }

  getValueBrandClass(brand: Brand) {
    this.brandText = brand;
  }
  getValueColorClass(color: Color) {
    this.colorText= color;
  }

  filtrele() {
    console.log(this.brandText.id,this.colorText.id)
    if(this.brandText.id !== -1 && this.colorText.id !== -1)
    {
      this.carService.getCarDetailsByBrandColor(this.brandText.id,this.colorText.id).subscribe(data => {
        this.cars = data.data
    }); 
    }
    else if(this.brandText.id !== -1)
    {
      this.carService.getCarsByBrand(this.brandText.id).subscribe(data => {
        this.cars = data.data
    }); 
    }
    else if(this.colorText.id !== -1)
    {
      this.carService.getCarsByColor(this.colorText.id).subscribe(data => {
        this.cars = data.data
    });
    }
    else{
      this.getCarsDto();
    }       
  }

  allitem(){
    this.getCarsDto();
    this.brandText= { id: -1, brandName: 'Marka Seçiniz' };
    this.colorText= { id: -1, colorName: 'Renk Seçiniz' };
  }
}
