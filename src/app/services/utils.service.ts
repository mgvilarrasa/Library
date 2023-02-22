import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

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
