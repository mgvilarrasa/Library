import { Injectable } from '@angular/core';
import { v4 as uuidV4 } from 'uuid';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastComponent } from '../components/dialogs/toast/toast.component';

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
      /*
      this._snackBar.openFromComponent(ToastComponent, {
        data: {
          message: message,
          ok: status
        },
        panelClass: 'success-snackbar',
        duration: 3000
      });
      */
     this.snackBar.open(message, '', {
      duration: 3000, 
      panelClass: ['success-snackbar'],
     });
    }
    else{
      /*
      this._snackBar.openFromComponent(ToastComponent, {
        data: {
          message: message,
          ok: status
        },
        panelClass: 'error-snackbar',
        duration: 3000
      });
      */
      this.snackBar.open(message, '', {
        duration: 3000, 
        panelClass: ['error-snackbar'],
       });
    }
  }
}
