import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular'

@Injectable({
  providedIn: 'root'
})

export class userService {
    private baseURI = 'http://localhost:3000';

    constructor(private http: HttpClient, private storage: Storage) { }

    async retrieveHttpOpts() {
        this.storage.get('setting: token')
        const opts = {
            headers: new HttpHeaders({
                Authorization: await this.storage.get('setting: token') 
            })
        }
        return opts
    }

    async login(user: any) {
        return await this.http.post(`${this.baseURI}/auth/login`, user).toPromise()
    }

    async logout() {
        this.storage.set('setting: token', null)
    }

    async isLogin() {
        return await this.storage.get('setting: token') ? true : false;
    }
    
    async haveRole() {
        const opts = await this.retrieveHttpOpts()
        const result: any = await this.http.get(`${this.baseURI}/user`, opts).toPromise()
        
        if(result.role !== 'EMPLOYEE'){
            return false
        } else {
            return true
        }
    }

    async getUser() {
        const opts = await this.retrieveHttpOpts()
        return this.http.get(`${this.baseURI}/user`, opts).toPromise()
    }

    async favBook(book_id: any) {
        const opts = await this.retrieveHttpOpts()
        return this.http.post(`${this.baseURI}/user/fav-books`, {book_id}, opts).toPromise()
    }

    async getFavs() {
        const opts = await this.retrieveHttpOpts()
        return this.http.get(`${this.baseURI}/user/fav-books`, opts).toPromise()
    }

    async removeFav(book_id: any) {
        const opts = await this.retrieveHttpOpts()
        return this.http.delete(`${this.baseURI}/user/fav-books/${book_id}`, opts).toPromise()
    }

    async reserveBook(book_id: any, reservedDate: Date){
        const opts = await this.retrieveHttpOpts()
        return this.http.post(`${this.baseURI}/books/reserved`, {book_id, reservedDate}, opts).toPromise()
    }

    async retrieveReserveds(){
        const opts = await this.retrieveHttpOpts()
        return this.http.get(`${this.baseURI}/get-reserved`, opts).toPromise()
    }

    async updateUserInfo(first_name: string, last_name: string, email: string){
        const opts = await this.retrieveHttpOpts()
        return this.http.put(`${this.baseURI}/auth/update`, {first_name, last_name, email}, opts).toPromise()
    }

    async registerUser(first_name: string, last_name: string, email: string, username: string, password: string, adminCode: string) {
        return this.http.post(`${this.baseURI}/auth/register`, {
            first_name,
            last_name,
            username,
            password,
            email,
            adminCode
        }).toPromise()
    }

    async sendMail(title: string, about: string, message: string) {
        const opts = await this.retrieveHttpOpts()
        return this.http.post(`${this.baseURI}/mail`, {title, about, message}, opts).toPromise()
    }

    async retrieveMails(){
        const opts = await this.retrieveHttpOpts()
        return this.http.get(`${this.baseURI}/mail`, opts).toPromise()
    }
}