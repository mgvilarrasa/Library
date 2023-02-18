import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';
import { BookDetailComponent } from '../book-detail/book-detail.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Book>();
  public displayedColumns = ['title', 'author', 'genre', 'editorial', 'bookId', 'internalId', 'actions']

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private booksSvc: BooksService, 
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
      internalId: item.internalId
    };

    dialogConfig.width = '500px';

    this.dialog.open(BookDetailComponent, dialogConfig);
  }
  public bookUpdate(uuid: string) {
    
  }
  public bookDelete(uuid: string) {
    
  }

}
