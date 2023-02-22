import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit{
  public submitted = false;
  public bookForm = this.formBuilder.group({
    title: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    author: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    genre: [''],
    editorial: [''],
    bookId: [''],
    internalId: ['']
  })

  constructor(
    private booksSvc: BooksService,
    private utilsSvc: UtilsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookCreateComponent>
  ) 
  {}

  ngOnInit(): void {
  }

  get bookFormControl() {
    return this.bookForm.controls;
  }

  save(): void{
    this.submitted = true;
    if(this.bookForm.valid){
      let newBook = {
        uuid: this.utilsSvc.generateUuid(),
        title: this.bookForm.get('title')?.value,
        author: this.bookForm.get('author')?.value,
        genre: this.bookForm.get('genre')?.value,
        editorial: this.bookForm.get('editorial')?.value,
        bookId: this.bookForm.get('bookId')?.value,
        internalId: this.bookForm.get('internalId')?.value
      } as Book;
      this.booksSvc.create(newBook).subscribe(
        (data) => {
          this.dialogRef.close(data.status);
        },
        error => this.dialogRef.close(0)
      );
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }

}
