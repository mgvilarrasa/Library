import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/entities/Book';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit{
  public book: Book | undefined;

  constructor(private booksSvc: BooksService, private activeRoute: ActivatedRoute){}

  ngOnInit(): void {
    this.getBookDetails();
  }

  private getBookDetails(){
    let uuid: string = this.activeRoute.snapshot.params['uuid'];
    this.book = this.booksSvc.getBookById(uuid)
  }

}
