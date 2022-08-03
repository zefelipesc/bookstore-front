import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: [
    './book-create.component.css'
  ]
})
export class BookCreateComponent implements OnInit {

  id_cat: String = ''

  book: Book = {
    id: '',
    title: '',
    author_name: '',
    text: '',
  }

  title = new FormControl('', [Validators.minLength(3)])
  author_name = new FormControl('', [Validators.minLength(3)])
  text = new FormControl('', [Validators.minLength(10)])

  constructor(
    private service: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!
  }

  create(): void {
    this.service.create(this.book, this.id_cat).subscribe({
      next: () => {
      this.router.navigate([`categories/${this.id_cat}/books`])
      this.service.message('Book successfully created!')
    }, error: () => {
      this.router.navigate([`categories/${this.id_cat}/books`])
      this.service.message('Error creating book. Try again!')
    }})
  }

  cancel(): void {
    this.router.navigate([`categories/${this.id_cat}/books`])
  }

  getMessage() {
    if(this.title.invalid) {
      return 'The field title should contain between 3 and 100 caracteres';
    }

    if(this.author_name.invalid) {
      return 'The author name should contain between 3 and 50 caracteres';
    }

    if(this.text.invalid) {
      return 'The field text should contain between 10 and 2000000 caracteres';
    }

    return false;
    
  }

}
