import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css'],
})
export class BrandAddComponent implements OnInit {
  brands: Brand[] = [];
  brandAddForm: FormGroup;

  brandxx: Brand = { id: -1, brandName: '' };

  constructor(
    private formBuilder: FormBuilder,
    private brandService: BrandService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.createBrandAddForm();
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      brandName: ['', Validators.required],
    });
  }

  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.brandAdd(brandModel).subscribe(
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

  getBrand(brandsss: Brand) {
    this.brandxx = brandsss;
  }

  handleKeyup(event: any): void {
    this.brandxx.brandName = event.target.value;
    console.log(event);
  }

  updateBrand() {
    this.brandService.brandUpdate(this.brandxx).subscribe(
      (response) => {
        this.toastrService.success(this.brandxx.brandName, 'Güncellendi');
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
              'Güncelleme Başarısız'
            );
          }
        }
      }
    );

    function refreshx() {
      window.location.reload();
    }
    window.setInterval(refreshx, 1000);
  }
}
