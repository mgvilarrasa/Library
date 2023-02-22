import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../entities/Book';
import { Utils } from '../entities/Utils';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private booksUrl = Utils.serverUrl + '/books';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.booksUrl);
  }

  getBookById(uuid: string): Observable<Book> {
    return this.http.get<Book>(this.booksUrl + '/' + uuid);
  }

  create(book: Book): Observable<any> {
    return this.http.post<HttpResponse<any>>(this.booksUrl, book, { observe: 'response' });
  }

  update(book: Book): Observable<any> {
    return this.http.put<HttpResponse<any>>(this.booksUrl + '/' + book.uuid, book, { observe: 'response' });
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<HttpResponse<any>>(this.booksUrl + '/' + uuid, { observe: 'response' });
  }
}
