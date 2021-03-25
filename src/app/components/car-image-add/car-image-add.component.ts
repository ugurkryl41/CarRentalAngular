import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormControl,Validators} from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { CarDto } from 'src/app/models/car-dto';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-image-add',
  templateUrl: './car-image-add.component.html',
  styleUrls: ['./car-image-add.component.css']
})

export class CarImageAddComponent implements OnInit {

  carImageAddForm:FormGroup
  carsDto:CarDto[];
  selectedFile: File

  constructor(
    private formBuilder:FormBuilder,
    private carService: CarService,
    private carImageService:CarImageService,
    private toastrService:ToastrService,
    ) { }

  ngOnInit(): void {
    this.getCarsDto();
    this.createCarImageAddForm();
  }

  getCarsDto(){
    this.carService.getCarsDetails().subscribe(data=>{
      this.carsDto = data.data
    });
  }

  createCarImageAddForm(){
    this.carImageAddForm = this.formBuilder.group({
        carId:["",Validators.required],
    });
  }

  add(){
    if(this.carImageAddForm.valid){
      let carImageModel = Object.assign({},this.carImageAddForm.value);
      this.carImageService.carImageAdd(carImageModel,this.selectedFile).subscribe(data=>{
        this.toastrService.success("Ekleme Başarılı",data.message);
      },dataError=>{
        this.toastrService.error("İşlem Başarısız",dataError)
      })
      console.log(carImageModel);   
    }
    else{
      this.toastrService.error("Formu doldurnuz");
    }  

    function refreshx() {
        window .location.reload();
    }   
    window.setInterval(refreshx, 1000); 
  }  

  onFileChanged(event:any) {
    this.selectedFile = event.target.files[0]
  }

}
