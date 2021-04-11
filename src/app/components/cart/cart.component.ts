import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  carts:Cart[]
  
  constructor(private cartService:CartService,private authService:AuthService) { }

  ngOnInit(): void {
    this.cartsgetAll();
  }

  cartsgetAll(){
    this.cartService.cartGetAll(this.authService.customerId).subscribe(response=>{
      this.carts = response.data
      console.log(response)
    })
  }

}
