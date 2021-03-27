import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';
@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css'],
})
export class ColorAddComponent implements OnInit {

  colors: Color[] = [];
  colorAddForm: FormGroup;

  colorxx: Color = { id: -1, colorName: '' };

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.getColors();
    this.createColorAddForm();
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      colorName: ['', Validators.required],
    });
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.colorAdd(colorModel).subscribe(
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
        }
      );
    } else {
      this.toastrService.warning('Formu doldurunuz');
    }

    function refreshx() {
      window.location.reload();
    }
    window.setInterval(refreshx, 1000);
  }

  getColor(colorrrr: Color) {
    this.colorxx = colorrrr;
  }

  handleKeyup(event: any): void{ 
    this.colorxx.colorName = event.target.value;
    console.log(event);
}

  updateColor() {
    
    this.colorService.colorUpdate(this.colorxx).subscribe(
      (response) => {
        this.toastrService.success(this.colorxx.colorName, 'Güncellendi');
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

    function refreshx() {
      window.location.reload();
    }
    window.setInterval(refreshx, 1000);
  }

}
