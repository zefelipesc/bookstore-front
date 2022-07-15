import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: [
    './category-delete.component.css'
  ]
})
export class CategoryDeleteComponent implements OnInit {

  category: Category = {
    id: '',
    name: '',
    description: ''
  }

  constructor(private service: CategoryService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.category.id = this.route.snapshot.paramMap.get('id')!
    this.findById();
  }

  findById(): void {
    this.service.findById(this.category.id!).subscribe((resposta) => {
      this.category = resposta;
      console.log(this.category)
    })
  }

  delete(): void {
    this.service.delete(this.category.id!).subscribe((resposta) => {
      this.router.navigate(['categories'])
      this.service.message('Category succesfully deleted!')
    }, err => {
      this.service.message(err.error.error)
    })
  }

  cancel(): void {
    this.router.navigate(['categories'])
  }

}
