import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarImageComponent } from './components/car-image/car-image.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';



const routes: Routes = [
  {
    path:"", component:CarComponent    
  },
  {
    path:"cars", component:CarComponent   
  },
  {
    path:"cars/brand/:brandid", component:CarComponent   
  },
  {
    path:"cars/color/:colorid", component:CarComponent   
  },
  {
    path:"customers",  component:CustomerComponent
  },
  {
    path:"rentals",  component:RentalComponent
  },
  {
    path:"car-image/:carId",  component:CarImageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
