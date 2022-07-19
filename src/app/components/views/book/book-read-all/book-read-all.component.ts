import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../book.model';
import { bookService } from '../book.service';

@Component({
  selector: 'app-book-read-all',
  templateUrl: './book-read-all.component.html',
  styleUrls: [
    './book-read-all.component.css'
  ]
})
export class BookReadAllComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'books', 'actions'];

  id_cat: String = ''

  books: Book[] = []

  constructor(private service: bookService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
    this.findAll();
  }

  findAll(): void {
    this.service.findAllByCategory(this.id_cat).subscribe((resposta) =>{
      this.books = resposta
    })
  }

}
