import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from 'src/app/components/dialogs/confirm-dialog/confirm-dialog.component';
import { User } from 'src/app/entities/User';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UserCreateComponent } from '../user-create/user-create.component';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, AfterViewInit{
  public dataSource = new MatTableDataSource<User>();
  public displayedColumns = ['name', 'lastName', 'lastName2', 'email', 'internalId', 'actions']

  @ViewChild(MatSort)
  sort!: MatSort;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private usersSvc: UsersService,
    private utilsSvc: UtilsService, 
    private dialog: MatDialog
    ){}

  ngOnInit(): void {
    this.getUserList();
  }

  ngAfterViewInit(): void{
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public doFilter(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  public getUserList() {
    this.usersSvc.getUsers().subscribe(res => {
      this.dataSource.data = res as User[];
    })
  }

  public userDetails(item: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      uuid: item.uuid,
      name: item.name,
      lastName: item.lastName,
      lastName2: item.lastName2,
      email: item.email,
      internalId: item.internalId
    };

    dialogConfig.width = '500px';

    this.dialog.open(UserDetailsComponent, dialogConfig);
  }

  public userCreate(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';

    this.dialog.open(UserCreateComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data){
        if(data === 201){
          this.utilsSvc.openSnackBar('User created', true);
        }
        else{
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + data, false);
        }
      }
      this.getUserList();
    });
  }

  public userUpdate(item: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { 
      uuid: item.uuid,
      name: item.name,
      lastName: item.lastName,
      lastName2: item.lastName2,
      email: item.email,
      internalId: item.internalId
    };

    dialogConfig.width = '500px';
    this.dialog.open(UserUpdateComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data){
        if(data === 200){
          this.utilsSvc.openSnackBar('Book updated', true);
        }
        else{
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + data, false);
        }
      }  
      this.getUserList();
    }); 
  }
  public userDelete(item: User) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '500px';
    dialogConfig.data = {
      title: 'Do you want to delete this user?',
      messageBody: item.name + ' ' + item.lastName + ' ' + item.lastName2 + ' with email ' + item.email
    }

    this.dialog.open(ConfirmDialogComponent, dialogConfig).afterClosed().subscribe((data) => {
      if(data === true){
        this.usersSvc.delete(item.uuid).subscribe((response) => {
          if(response.status === 200){
            this.utilsSvc.openSnackBar('User deleted', true);
          }
          else{
            this.utilsSvc.openSnackBar('Something went wrong. Code: ' + response.status, false);
          }
          this.getUserList();
        },
        error => {
          this.utilsSvc.openSnackBar('Something went wrong. Code: ' + 0, false);
          this.getUserList();
        })
      }
    })
  }
}
