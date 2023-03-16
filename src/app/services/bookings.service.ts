import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Booking } from '../entities/Booking';
import { Utils } from '../entities/Utils';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private bookingsUrl = Utils.serverUrl + '/bookings';

  constructor(private http: HttpClient) {}

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl);
  }

  getDelayedBooking(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.bookingsUrl + '/delayed');
  }

  getBookingById(uuid: string): Observable<Booking> {
    return this.http.get<Booking>(this.bookingsUrl + '/' + uuid);
  }

  getBookingByBook(bookId: string): Observable<Booking> {
    return this.http.get<Booking>(this.bookingsUrl + '/book/' + bookId);
  }

  getBookingsByUser(userId: string, pending: boolean): Observable<Booking[]> {
    const params = new HttpParams().set('userId', userId).set('pending', pending);
    return this.http.get<Booking[]>(this.bookingsUrl + '/filtered', {params});
  }

  create(booking: Booking): Observable<any> {
    return this.http.post<HttpResponse<any>>(this.bookingsUrl, booking, { observe: 'response' });
  }

  update(booking: Booking): Observable<any> {
    return this.http.put<HttpResponse<any>>(this.bookingsUrl + '/' + booking.uuid, booking, { observe: 'response' });
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<HttpResponse<any>>(this.bookingsUrl + '/' + uuid, { observe: 'response' });
  }

  returnBook(uuid: string): Observable<any> {
    return this.http.put<HttpResponse<any>>(this.bookingsUrl + '/' + uuid + '/return', '' , { observe: 'response' });
  }

  delayEndDate(uuid: string, newEndDate: string): Observable<any> {
    const params = new HttpParams().set('newEndDate', newEndDate);
    return this.http.put<HttpResponse<any>>(this.bookingsUrl + '/' + uuid + '/delay', {params}, { observe: 'response' });
  }
}
