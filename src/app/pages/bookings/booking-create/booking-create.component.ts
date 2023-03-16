import { DatePipe, formatDate } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/entities/Book';
import { User } from 'src/app/entities/User';
import { Booking } from 'src/app/entities/Booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss']
})
export class BookingCreateComponent implements OnInit{
  public submitted = false;

  public users: any;
  public books: any;

  public book: Book;
  public selectedUser: any;

  public bookingForm = this.formBuilder.group({
    startDate: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    endDate: ['', [
      Validators.required,
      Validators.minLength(2)
    ]]
  })

  constructor(
    private bookingsSvc: BookingsService,
    private bookSvc: BooksService,
    private userSvc: UsersService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookingCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Book
  ) 
  {
    this.book = data;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.userSvc.getUsers().subscribe((data) => {
      this.users = data as User[];
    });
    this.bookSvc.getBooks().subscribe((data) => {
      this.books = data as Book[];
    })
  }

  get bookingFormControl() {
    return this.bookingForm.controls;
  }

  save(): void{
    this.submitted = true;
    if(this.bookingForm.valid && this.selectedUser != null){
      const startDate = new DatePipe('en').transform(this.bookingForm.get('startDate')?.value, 'yyyy-MM-dd');
      const endDate = new DatePipe('en').transform(this.bookingForm.get('endDate')?.value, 'yyyy-MM-dd');

      let newBookingRequest = {
        uuid: this.utilsSvc.generateUuid(),
        userId: this.selectedUser,
        bookId: this.book.uuid,
        startDate: startDate,
        endDate: endDate,
        returnDate: '',
        userName: '',
        bookTitle: '',
        bookInternalId: ''
      } as Booking;
      this.bookingsSvc.create(newBookingRequest).subscribe(
        (data) => {
          this.dialogRef.close(data);
        },
        error => this.dialogRef.close(error)
      );
    } else{
      this.utilsSvc.openSnackBar('Complete the form before saving', false);
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
