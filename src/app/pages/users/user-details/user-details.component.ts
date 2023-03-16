import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Booking } from 'src/app/entities/Booking';
import { User } from 'src/app/entities/User';
import { BookingsService } from 'src/app/services/bookings.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  public user: User;
  public bookings: any;

  constructor(
    private usersSvc: UsersService, 
    private bookingsSvc: BookingsService,
    private dialogRef: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User
  ) {
      this.user = data;
    }

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingsSvc.getBookingsByUser(this.user.uuid , true).subscribe((data) => {
      this.bookings = data as Booking[];
    })
  }

  close(): void {
    this.dialogRef.close();
  }
}
