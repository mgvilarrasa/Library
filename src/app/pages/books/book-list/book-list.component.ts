import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';
import { UtilsService } from 'src/app/services/utils.service';
import { BookingCreateComponent } from '../../bookings/booking-create/booking-create.component';
import { BookCreateComponent } from '../book-create/book-create.component';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { BookUpdateComponent } from '../book-update/book-update.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Book>();
  public displayedColumns = ['title', 'author', 'genre', 'editorial', 'bookId', 'internalId', 'booked', 'actions']

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private booksSvc: BooksService,
    private utilsSvc: UtilsService, 
    private dialog: MatDialog
    ){}

  ngOnInit(): void {
    this.getBookList();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getBookList() {
    this.booksSvc.getBooks().subscribe(res => {
      this.dataSource.data = res as Book[];
    })
  }

  public bookDetails(item: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      uuid: item.uuid,
      title: item.title,
      author: item.author,
      genre: item.genre,
      editorial: item.editorial,
      bookId: item.bookId,
      internalId: item.internalId,
      bookingId: item.bookingId
    };

    dialogConfig.width = '500px';

    this.dialog.open(BookDetailComponent, dialogConfig);
  }

  public bookCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';

    this.dialog.open(BookCreateComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data){
        if(data.status === 201){
          this.utilsSvc.openSnackBar('Book created', true);
        }
        else{
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + data.status  + ' - ' + data.error.message, false);
        }
      }
      this.getBookList();
    });
  }

  public createBooking(item: Book) {
    if(item.bookingId == null){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.width = '700px';
      dialogConfig.data = {
        uuid: item.uuid,
        title: item.title,
        author: item.author,
        genre: item.genre,
        editorial: item.editorial,
        bookId: item.bookId,
        internalId: item.internalId
      };

      this.dialog.open(BookingCreateComponent, dialogConfig).afterClosed().subscribe((data) => {
        if(data){
          if(data.status === 201){
            this.utilsSvc.openSnackBar('Booking created', true);
          }
          else{
            this.utilsSvc.openSnackBar('Something went wrong. Code: ' + data.status  + ' - ' + data.error.message, false);
          }
        }
        this.getBookList();
      })
    } else{
      this.utilsSvc.openSnackBar('Book already booked', false);
    }
  }

  public bookUpdate(item: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      uuid: item.uuid,
      title: item.title,
      author: item.author,
      genre: item.genre,
      editorial: item.editorial,
      bookId: item.bookId,
      internalId: item.internalId
    };

    dialogConfig.width = '500px';
    this.dialog.open(BookUpdateComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data){
        if(data.status === 200){
          this.utilsSvc.openSnackBar('Book updated', true);
        }
        else{
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + data.status  + ' - ' + data.error.message, false);
        }
      }
      this.getBookList();
    }); 
  }
  public bookDelete(item: Book) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      title: 'Do you want to delete this book?',
      messageBody: item.title
    }

    this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data === true){
        this.booksSvc.delete(item.uuid).subscribe((response) => {
          if(response.status === 200){
            this.utilsSvc.openSnackBar('Book deleted', true);
          }
          else{
            this.utilsSvc.openSnackBar('Something went wrong. Code: ' + response.status + ' - ' + response.error.message, false);
          }
          this.getBookList();
        },
        error => {
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + error.status + ' - ' + error.error.message, false);
          this.getBookList();
        }
      )
      }
    })
  }
}
