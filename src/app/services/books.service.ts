import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../entities/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksFileUrl = 'http://localhost:8181/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksFileUrl);
  }

  getBookById(uuid: string): Observable<Book> {
    return this.http.get<Book>(this.booksFileUrl + '/' + uuid);
  }

  create(book: Book): Observable<any> {
    return this.http.post<HttpResponse<any>>(this.booksFileUrl, book, { observe: 'response' });
  }

  update(book: Book): Observable<any> {
    return this.http.put<HttpResponse<any>>(this.booksFileUrl + '/' + book.uuid, book, { observe: 'response' });
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<HttpResponse<any>>(this.booksFileUrl + '/' + uuid, { observe: 'response' });
  }
}
