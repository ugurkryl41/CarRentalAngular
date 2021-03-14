import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';

const routes: Routes = [
  {
    path:"", component:CarComponent    
  },
  {
    path:"cars", component:CarComponent   
  },
  {
    path:"cars/brand/:id", component:CarComponent   
  },
  {
    path:"customers",  component:CustomerComponent
  },
  {
    path:"rentals",  component:CustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
