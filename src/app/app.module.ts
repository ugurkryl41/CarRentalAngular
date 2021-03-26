import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { RentalDatePipePipe } from './pipes/rental-date-pipe.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';

import {ToastrModule} from 'ngx-toastr';
import { EditPanelComponent } from './components/edit-panel/edit-panel.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarImageAddComponent } from './components/car-image-add/car-image-add.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';
import { PaymentComponent } from './components/payment/payment.component'

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    BrandPipePipe,
    ColorPipePipe,
    RentalDatePipePipe,
    CarDetailComponent,
    EditPanelComponent,
    BrandAddComponent,
    ColorAddComponent,
    CarAddComponent,
    CarImageAddComponent,
    CarRentComponent,
    PaymentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,
  FormsModule, ToastrModule.forRoot({positionClass:"toast-bottom-right"}),ReactiveFormsModule,
  BrowserAnimationsModule,],
  
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
