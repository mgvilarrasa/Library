import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/entities/User';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent implements OnInit{
  public user: User;
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
    private usersSvc: UsersService, 
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: User
  ) 
  {
      this.user = data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.userForm.patchValue({
      name: this.user.name,
      lastName: this.user.lastName,
      lastName2: this.user.lastName2,
      email: this.user.email,
      internalId: this.user.internalId
    });
  }

  get userFormControl() {
    return this.userForm.controls;
  }

  save(): void{
    this.submitted = true;
    if(this.userForm.valid){
      let updatedUser = {
        uuid: this.user.uuid,
        name: this.userForm.get('name')?.value,
        lastName: this.userForm.get('lastName')?.value,
        lastName2: this.userForm.get('lastName2')?.value,
        email: this.userForm.get('email')?.value,
        internalId: this.userForm.get('internalId')?.value
      } as User;
      this.usersSvc.update(updatedUser).subscribe(
        (data) => {
          this.dialogRef.close(data);
        },
        error => {
          this.dialogRef.close(error)
        }
      );
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
