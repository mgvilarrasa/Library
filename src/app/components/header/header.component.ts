import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Booking } from 'src/app/entities/Booking';
import { BookingsService } from 'src/app/services/bookings.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  public delayedBookings: any;

  @Input() inputSideNav!: MatSidenav;
  
  constructor(
    private bookingsSvc: BookingsService
  ){}

  ngOnInit(): void{
    this.checkDelayedBookings();
  }

  checkDelayedBookings(): void {
    this.bookingsSvc.getDelayedBooking().subscribe((data) => {
      let delayedBookings = data as Booking[];
      if(delayedBookings.length > 0) {
        this.delayedBookings = true;
      } else{
        this.delayedBookings = false;
      }
    })
  }

}
