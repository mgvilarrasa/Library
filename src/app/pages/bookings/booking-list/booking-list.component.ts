import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { Booking } from 'src/app/entities/Booking';
import { BookingsService } from 'src/app/services/bookings.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BookingCreateComponent } from '../booking-create/booking-create.component';
import { BookingUpdateComponent } from '../booking-update/booking-update.component';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit, AfterViewInit{
  public onlyPending = true;
  public dataSource = new MatTableDataSource<Booking>();
  public displayedColumns = ['title', 'user', 'start', 'end', 'returnDate', 'internalId', 'actions']

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private bookingsSvc: BookingsService,
    private utilsSvc: UtilsService, 
    private dialog: MatDialog
  ){}

  ngOnInit(): void {
    this.getBookingList();
  }

  ngAfterViewInit(): void{
    this.dataSource.paginator = this.paginator;
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getBookingList() {
    if(this.onlyPending){
      this.bookingsSvc.getBookingsByUser('' , true).subscribe(res => {
        this.dataSource.data = res as Booking[];
      })
    } else{
      this.bookingsSvc.getBookings().subscribe(res => {
        this.dataSource.data = res as Booking[];
      })
    }
  }

  onlyPendingChanged(){
    this.getBookingList();
  }

  returnBook(item: any){
    const returnDate = new DatePipe('en').transform(new Date(), 'yyyy-MM-dd');

    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      title: 'Do you want to finish this booking?',
      messageBody: 'Returning date: ' + returnDate
    };

    this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data === true){
        this.bookingsSvc.returnBook(item.uuid).subscribe(response => {
          console.log(response);
          if(response.status === 200){
            this.utilsSvc.openSnackBar('Book returned', true);
          }
          else{
            this.utilsSvc.openSnackBar('Something went wrong. Code: ' + response.status + ' - ' + response.error.message, false);
          }
          this.getBookingList();
        },
        error => {
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + error.status + ' - ' + error.error.message, false);
          this.getBookingList();
        })
      }
    })
  }

  bookingUpdate(item: any){
    if(item.returnDate == null){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '400px';
      dialogConfig.data = {
        uuid: item.uuid,
        userId: item.userId,
        bookId: item.bookId,
        startDate: item.startDate,
        endDate: item.endDate,
        returnDate: item.returnDate,
        userName: item.userName,
        bookTitle: item.bookTitle,
        bookInternalId: item.bookInternalId,
      };

      this.dialog.open(BookingUpdateComponent, dialogConfig).afterClosed().subscribe((data) => {
        if(data){
          if(data.status === 200){
            this.utilsSvc.openSnackBar('Booking updated', true);
          }
          else{
            this.utilsSvc.openSnackBar('Something went wrong. Code: ' + data.status  + ' - ' + data.error.message, false);
          }
        }
        this.getBookingList();
      })
    } else{
      this.utilsSvc.openSnackBar('Booking finished', false);
    }
  }


  bookingDelete(item: any){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      title: 'Do you want to delete this booking?',
      messageBody: ''
    }

    this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data === true){
        this.bookingsSvc.delete(item.uuid).subscribe(response => {
          if(response.status === 200){
            this.utilsSvc.openSnackBar('Booking deleted', true);
          }
          else{
            this.utilsSvc.openSnackBar('Something went wrong. Code: ' + response.status + ' - ' + response.error.message, false);
          }
          this.getBookingList();
        },
        error => {
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + error.status + ' - ' + error.error.message, false);
          this.getBookingList();
        })
      }
    })
  }
}
