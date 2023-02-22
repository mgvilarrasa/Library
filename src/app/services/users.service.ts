import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../entities/User';
import { Utils } from '../entities/Utils';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private usersUrl = Utils.serverUrl + '/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  getUserById(uuid: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/' + uuid);
  }

  getUserByEmail(email: string): Observable<User> {
    return this.http.get<User>(this.usersUrl + '/email/' + email);
  }

  create(user: User): Observable<any> {
    return this.http.post<HttpResponse<any>>(this.usersUrl, user, { observe: 'response' });
  }

  update(user: User): Observable<any> {
    return this.http.put<HttpResponse<any>>(this.usersUrl + '/' + user.uuid, user, { observe: 'response' });
  }

  delete(uuid: string): Observable<any> {
    return this.http.delete<HttpResponse<any>>(this.usersUrl + '/' + uuid, { observe: 'response' });
  }
}
