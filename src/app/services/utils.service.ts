import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Utils } from '../entities/Utils';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private url = Utils.serverUrl + '/health-check';

  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }

  healthCheck(): Observable<any> {
    return this.http.get<any>(this.url, {observe: 'response'});
  }

  generateUuid(): string {
    return uuidV4();
  }

  openSnackBar(message: string, status: boolean) {
    if(status){
     this.snackBar.open(message, '', {
      duration: 3000, 
      panelClass: ['success-snackbar'],
     });
    }
    else{
      this.snackBar.open(message, '', {
        duration: 3000, 
        panelClass: ['error-snackbar'],
       });
    }
  }
}
