import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { booksService } from '../app_API/books.service';
import * as _ from 'lodash'
import { ToastController } from '@ionic/angular';
import { userService } from '../app_API/user.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.page.html',
  styleUrls: ['./books-list.page.scss'],
})
export class BooksListPage implements OnInit, OnDestroy{

  private booksArray: any[] = [];
  private searchBook: string;
  private user: any = {}
  private inputActive: boolean = null
  private zeroLength: boolean = null

  constructor(private booksService: booksService, private route: Router, private userService: userService, public toastController: ToastController) { 
    this.booksService.retrieveAllBooks()
    .then((books: any[]) => {
      if(books.length === 0){
        this.zeroLength = true
        this.booksArray = []

        this.userService.getUser().then(res => {
          this.user = res
          if(this.user.role === 'EMPLOYEE'){
            this.inputActive = true
          } else if(this.user.role === 'NORMAL'){
            this.inputActive = false
          }
        }).catch(err => {
          this.actionError()
          console.log(err)
        })
      } else {
        this.zeroLength = null
        books.map(a => this.booksArray.push(a))
        this.booksArray = _.orderBy(this.booksArray, ['id'], ['asc'])

        this.userService.getUser().then(res => {
          this.user = res
          if(this.user.role === 'EMPLOYEE'){
            this.inputActive = true
          } else if(this.user.role === 'NORMAL'){
            this.inputActive = false
          }
        }).catch(err => {
          this.actionError()
          console.log(err)
        })
      }
    }).catch(err => {
      this.actionError()
      console.error(err)
    })
  }

  @HostListener('unloaded')
  ngOnDestroy(): void {
      this.user = null
      this.inputActive = null
  }

  ngOnInit(): void { }

  getIndex(index: Number){
    this.route.navigate(['/book-detail'], { queryParams: {
      id: index
    }})
  }

  logout(){
    this.userService.logout()
    this.route.navigate(['/home'])
    this.user = null
    this.logoutOK()
  }

  async actionError(){
    const toaster = await this.toastController.create({
      message: 'Error - Action Failed',
      duration: 2000,
      color: 'danger',
      position: 'bottom',
      buttons: [
        {
          text: 'Hide message',
          role: 'cancel'
        }
      ]
    });
    toaster.present();
  }

  async logoutOK(){
    const toaster = await this.toastController.create({
      message: 'Logout',
      duration: 2000,
      color: 'success',
      position: 'bottom',
      buttons: [
        {
          text: 'Hide message',
          role: 'cancel'
        }
      ]
    });
    toaster.present();
  }

  refresh() {
    window.location.reload()
  }
}
