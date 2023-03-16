import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/entities/Book';
import { Booking } from 'src/app/entities/Booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit{
  public book: Book;
  public booking: any;

  constructor(
    private booksSvc: BooksService, 
    private bookingSvc: BookingsService,
    private dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Book
  ) {
      this.book = data;
    }

  ngOnInit(): void {
    this.loadBookingDetails();
  }

  loadBookingDetails(): void {
    if(this.book.bookingId != null){
      this.bookingSvc.getBookingByBook(this.book.uuid).subscribe((data) => {
        this.booking = data as Booking;
      })
    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
