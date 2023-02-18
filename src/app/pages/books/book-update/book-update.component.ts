import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SideMenuComponent } from 'src/app/components/side-menu/side-menu.component';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit{
  public book: Book;
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
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<BookUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Book
  ) 
  {
      this.book = data;
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void{
    this.bookForm.patchValue({
      title: this.book.title,
      author: this.book.author,
      genre: this.book.genre,
      editorial: this.book.editorial,
      bookId: this.book.bookId,
      internalId: this.book.internalId
    });
  }

  get bookFormControl() {
    return this.bookForm.controls;
  }

  save(): void{
    this.submitted = true;
    if(this.bookForm.valid){
      

      this.dialogRef.close();
    }
  }
  
  close(): void {
    this.dialogRef.close();
  }
}
