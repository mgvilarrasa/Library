import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit{
  public book: Book;

  constructor(
    private booksSvc: BooksService, 
    private dialogRef: MatDialogRef<BookDetailComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Book
  ) {
      this.book = data;
    }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

}
