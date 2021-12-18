import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular'
import { Injectable } from '@angular/core';
import { userService } from './user.service';

@Injectable({
  providedIn: 'root'
})

export class booksService {
    private baseURI = 'http://localhost:3000';
    private userService1: userService = null;

    constructor(private http: HttpClient, private storage: Storage) { 
        this.userService1 = new userService(http, storage);
    }

    async retrieveAllBooks() {
        const opts = await this.userService1.retrieveHttpOpts()
        return this.http.get(`${this.baseURI}/books`, opts).toPromise()
    }

    async retrieveDetails(id: Number) {
        const opts = await this.userService1.retrieveHttpOpts()
        return this.http.get(`${this.baseURI}/books/${id}`, opts).toPromise()
    }

    async updateBookInfo(book_id: number, title: string, description: string, author: string, pages: number, quantity: number, status: any) {
        const opts = await this.userService1.retrieveHttpOpts()
        return this.http.put(`${this.baseURI}/books/${book_id}`, {
            title,
            description,
            author,
            pages,
            quantity,
            status
        }, opts).toPromise()
    }

    async createBook(title: string, description: string, author: string, pages: any, quantity: any, image: any){
        const opts = await this.userService1.retrieveHttpOpts()

        let formData: FormData = new FormData()

        formData.append('images', image),
        formData.append('title', title),
        formData.append('author', author),
        formData.append('description', description),
        formData.append('pages', pages),
        formData.append('quantity', quantity)

        let headers = new Headers();
        headers.append('Content-Type', 'multipart/form-data');
        headers.append('Accept', 'application/json');
        

        return this.http.post(`${this.baseURI}/books`, formData, opts).toPromise()
    }
}