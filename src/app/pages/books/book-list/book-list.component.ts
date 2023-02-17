import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, AfterViewInit {
  public dataSource = new MatTableDataSource<Book>();
  public displayedColumns = ['title', 'author', 'genre', 'editorial', 'bookId', 'internalId', 'details', 'update', 'delete']

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private booksSvc: BooksService, private router: Router){}

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

  public bookDetails(uuid: string) {
    let url: string = `/books/details/${uuid}`;
    this.router.navigate([url]);
  }
  public bookUpdate(uuid: string) {
    
  }
  public bookDelete(uuid: string) {
    
  }

}
