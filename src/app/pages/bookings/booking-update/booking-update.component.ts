import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/entities/Book';
import { Booking } from 'src/app/entities/Booking';
import { User } from 'src/app/entities/User';
import { BookingsService } from 'src/app/services/bookings.service';
import { BooksService } from 'src/app/services/books.service';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BookingCreateComponent } from '../booking-create/booking-create.component';

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.component.html',
  styleUrls: ['./booking-update.component.scss']
})
export class BookingUpdateComponent {
  public submitted = false;

  public booking: Booking;
  public startDate: any;
  public endDate: any;

  public bookingForm: any; 

  constructor(
    private bookingsSvc: BookingsService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookingCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Booking
  ) 
  {
    this.booking = data;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.startDate = new Date(this.booking.startDate);
    this.endDate = new Date(this.booking.endDate);

    this.bookingForm = this.formBuilder.group({
      startDate: [this.startDate, [
        Validators.required,
        Validators.minLength(2)
      ]],
      endDate: [this.endDate, [
        Validators.required,
        Validators.minLength(2)
      ]]
    })
  }

  get bookingFormControl() {
    return this.bookingForm.controls;
  }

  save(): void{
    this.submitted = true;
    if(this.bookingForm.valid){
      const startDate = new DatePipe('en').transform(this.bookingForm.get('startDate')?.value, 'yyyy-MM-dd');
      const endDate = new DatePipe('en').transform(this.bookingForm.get('endDate')?.value, 'yyyy-MM-dd');

      let bookingupdated = {
        uuid: this.booking.uuid,
        userId: this.booking.userId,
        bookId: this.booking.bookId,
        startDate: startDate,
        endDate: endDate,
        returnDate: '',
        userName: '',
        bookTitle: '',
        bookInternalId: ''
      } as Booking;
      
      this.bookingsSvc.update(bookingupdated).subscribe(
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
