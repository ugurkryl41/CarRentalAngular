import { Component, OnInit } from '@angular/core';
import { CarDto } from 'src/app/models/car-dto';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { BrandService } from 'src/app/services/brand.service';
import { Brand } from 'src/app/models/brand';
import { ColorService } from 'src/app/services/color.service';
import { Color } from 'src/app/models/color';
import { Car } from 'src/app/models/car';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css'],
})
export class CarAddComponent implements OnInit {
  carsDto: CarDto[];

  brands: Brand[];
  colors: Color[];

  carAddForm: FormGroup;
  carUpdateForm: FormGroup;

  carId: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getCarsDto();
    this.getBrands();
    this.getColors();
    this.createCarAddForm();
    this.createUpdateForm();
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

  getCarsDto() {
    this.carService.getCarsDetails().subscribe((data) => {
      this.carsDto = data.data;
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      findeks: ['', Validators.required],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.carAdd(carModel).subscribe(
        (data) => {
          this.toastrService.success('Ekleme Başarılı', data.message);
        },
        (dataError) => {
          if (dataError.error.ValidationErrors.length > 0) {
            for (let i = 0; i < dataError.error.ValidationErrors.length; i++) {
              this.toastrService.error(
                dataError.error.ValidationErrors[i].ErrorMessage,
                'İşlem Başarısız..!!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.warning('Formu doldurnuz');
    }

    function refreshx() {
      window.location.reload();
    }
    window.setInterval(refreshx, 1000);
  }

  getCar(cardt: CarDto) {
    this.carId = cardt.id;
  }

  createUpdateForm() {
    this.carUpdateForm = this.formBuilder.group({
      id: ['', Validators.required],
      brandId: ['', Validators.required],
      colorId: ['', Validators.required],
      modelYear: ['', Validators.required],
      dailyPrice: ['', Validators.required],
      description: ['', Validators.required],
      findeks: ['', Validators.required],
    });
  }

  updateCar() {
    this.carUpdateForm.patchValue({ id: this.carId });

    if (this.carUpdateForm.valid) {
      let carUpdateModel = Object.assign({}, this.carUpdateForm.value);
      this.carService.carUpdate(carUpdateModel).subscribe(
        (data) => {
          this.toastrService.success('Ekleme Başarılı', data.message);
        },
        (dataError) => {
          if (dataError.error.ValidationErrors.length > 0) {
            for (
              let i = 0;
              i < dataError.error.ValidationErrors.length;
              i++
            ) {
              this.toastrService.error(
                dataError.error.ValidationErrors[i].ErrorMessage,
                'İşlem Başarısız..!!'
              );
            }
          }
          else{
            this.toastrService.error('İşlem Başarısız..!!');
          }
        }
      );
    } else {
      this.toastrService.warning('Formu doldurnuz');
    }

    function refreshx() {
      window.location.reload();
    }
    window.setInterval(refreshx, 1000);
  }
}
