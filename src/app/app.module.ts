import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { CarImageComponent } from './components/car-image/car-image.component';
import { BrandPipePipe } from './pipes/brand-pipe.pipe';
import { ColorPipePipe } from './pipes/color-pipe.pipe';
import { RentalDatePipePipe } from './pipes/rental-date-pipe.pipe';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarRentComponent } from './components/car-rent/car-rent.component';


@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarImageComponent,
    BrandPipePipe,
    ColorPipePipe,
    RentalDatePipePipe,
    CarDetailComponent,
    CarRentComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,
  FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
