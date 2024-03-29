import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Book } from "./book.model";


@Injectable({
    providedIn: 'root'
})

export class BookService {

    baseUrl = environment.baseUrl

    constructor(
        private http: HttpClient,
        private _snack: MatSnackBar
        ) { }

    findAllByCategory(id_cat: String): Observable<Book[]> {
        const url = `${this.baseUrl}/books?category=${id_cat}`
        return this.http.get<Book[]>(url)
    }

    findById(id: String): Observable<Book>{
        const url = `${this.baseUrl}/books/${id}`
        return this.http.get<Book>(url)
    }

    update(book: Book):Observable<Book> {
        const url = `${this.baseUrl}/books/${book.id}`
        return this.http.put<Book>(url ,book)
    }

    create(book: Book, id_cat: String): Observable<Book> {
        const url = `${this.baseUrl}/books?category=${id_cat}`
        return this.http.post<Book>(url, book)
    }

    message(str: String): void {
        this._snack.open(`${str}`, 'OK', {
          horizontalPosition: 'end',
          verticalPosition: 'top',
          duration: 3000
        })
    }
}