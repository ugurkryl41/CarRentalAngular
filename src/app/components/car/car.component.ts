import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {

  item1 = { itemName: 'Araba 1' };
  item2 = { itemName: 'Araba 2' };
  item3 = { itemName: 'Araba 3' };

  items = [this.item1, this.item2, this.item3];

  constructor() { }

  ngOnInit(): void {
  }

}
