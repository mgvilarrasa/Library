import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/entities/User';
import { UsersService } from 'src/app/services/users.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit{
  public submitted = false;
  public userForm = this.formBuilder.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    lastName: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    lastName2: [''],
    email: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.email
    ]],
    internalId: ['']
  })

  constructor(
    private userSvc: UsersService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserCreateComponent>
  ) 
  {}

  ngOnInit(): void {
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  save(): void{
    this.submitted = true;
    if(this.userForm.valid){
      let newUser = {
        uuid: this.utilsSvc.generateUuid(),
        name: this.userForm.get('name')?.value,
        lastName: this.userForm.get('lastName')?.value,
        lastName2: this.userForm.get('lastName2')?.value,
        email: this.userForm.get('email')?.value,
        internalId: this.userForm.get('internalId')?.value
      } as User;
      this.userSvc.create(newUser).subscribe(
        (data) => {
          this.dialogRef.close(data);
        },
        error => this.dialogRef.close(error)
      );
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
