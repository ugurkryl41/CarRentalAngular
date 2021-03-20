import { Component, Input, OnInit } from '@angular/core';
import { Rental } from 'src/app/models/rental';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental',
  templateUrl: './rental.component.html',
  styleUrls: ['./rental.component.css'],
})
export class RentalComponent implements OnInit {
  
  @Input() rentals: Rental[] = [];

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.getRentals();
  }

  returnDateCheck(rental: Rental): string {
    let date: Date = new Date();
    if (rental.returnDate.toString() < date.toJSON().toString()) {
      return 'table-secondary'
    }
    return 'table-danger';
  }
  
  getRentals(){
    this.rentalService.getRentals().subscribe(p=>{this.rentals = p.data})
  }
}
