import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../entities/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksFileUrl = './assets/books.json';
  private bookList!: Book[];

  constructor(private http: HttpClient) {}

  getBooks() {
    return this.http.get(this.booksFileUrl)
  }

  getBookById(uuid: string) {
    this.getBooks().subscribe(res => {
      this.bookList = res as Book[];
    });
    return this.bookList.find((book) => {return book.uuid = uuid});
  }

}
