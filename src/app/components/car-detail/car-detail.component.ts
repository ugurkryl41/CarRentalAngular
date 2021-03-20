import { Component, Input, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

 @Input() rental:Rental[]
 
  constructor() { }

  ngOnInit(): void {
  }

}
