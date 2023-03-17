import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/entities/Book';
import { Booking } from 'src/app/entities/Booking';
import { User } from 'src/app/entities/User';
import { Utils } from 'src/app/entities/Utils';
import { BookingsService } from 'src/app/services/bookings.service';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  public totalBooks: any;
  public totalUsers: any;
  public totalBookings: any;
  public totalPendingBookings: any;
  public totalDelayedBookings: any;

  constructor(
    private booksSvc: BooksService,
    private usersSvc: UsersService,
    private bookingsSvc: BookingsService,
    private utilsSvc: UtilsService
  ){}

  ngOnInit(): void {
    this.checkServerConnection();
    this.loadData();
  }

  checkServerConnection(): void {
    this.utilsSvc.healthCheck().subscribe(response => {
      console.log(response);
      if(response.status != 200) {
        this.utilsSvc.openSnackBar('Something went wrong. Code: ' + response.status  + ' - ' + response.error.message, false);
      }
    }, 
    error => {
      this.utilsSvc.openSnackBar('Something went wrong. Code: ' + error.status + ' - ' + 'Check server status', false);
    })
  }

  loadData(): void{
    this.booksSvc.getBooks().subscribe(data => {
      let books = data as Book[];
      this.totalBooks = books.length;
    });

    this.usersSvc.getUsers().subscribe(data => {
      let users = data as User[];
      this.totalUsers = users.length;
    });

    this.bookingsSvc.getBookings().subscribe(data => {
      let bookings = data as Booking[];
      this.totalBookings = bookings.length;
    });

    this.bookingsSvc.getBookingsByUser('', true).subscribe(data => {
      let bookings = data as Booking[];
      this.totalPendingBookings = bookings.length;
    });

    this.bookingsSvc.getDelayedBooking().subscribe(data => {
      let bookings = data as Booking[];
      this.totalDelayedBookings = bookings.length;
    });
  }

}
