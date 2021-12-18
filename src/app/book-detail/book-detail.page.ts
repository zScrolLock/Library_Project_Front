import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { booksService } from '../app_API/books.service';
import { userService } from '../app_API/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnDestroy {

  public book: any = {}
  private favBooksUser: any;
  private reservedDate: Date = null;
  private actualUser: any = null
  private inputActive: boolean;
  private activeBook: boolean;
  private image: string;

  constructor(private route: ActivatedRoute, private bookService: booksService, private userService: userService, private router: Router, public toastController: ToastController) {
    this.route.queryParams.subscribe((params: any) => {
      if(params){
        this.bookService.retrieveDetails(params.id).then((res) => {
          this.book = res
          this.image = this.book.images[0].url

          if(this.book.quantity <= 1 || this.book.status === 'UNAVAILABLE') {
            this.activeBook = true
          } else {
            this.activeBook = false
          }

          this.userService.getFavs().then(res => {
            this.favBooksUser = res[0].favorites
            this.favBooksUser.map((a) => {
              if(a.id === this.book.id) {
                this.book.already = true
                return true
              } else {
                this.book.already = false
                return false
              }
            })
          }).catch(err => {
            this.actionError()
            console.log(err)
          })
      
          this.userService.getUser().then(res => {
            this.actualUser = res
            if(this.actualUser.role !== 'EMPLOYEE'){
              this.inputActive = true
            } else {
              this.inputActive = false
            }
          }).catch(err => {
            this.actionError()
            console.log(err)
          })
        }).catch(err => {
          this.actionError()
          console.log(err)
        })
      }
    })
  }

  ngOnDestroy() { }

  async favoriteBook(){
    if(this.book.already) {
      this.userService.removeFav(this.book.id).then((res) => {
        this.refresh()
        this.actionOk()
      }).catch(err => {
        this.actionError()
        console.log(err)
      })
    } else {
      this.userService.favBook(this.book.id).then((res) => {
        this.router.navigate(['/fav-list'])
        this.actionOk()
        this.book.already
      }).catch(err => {
        this.actionError()
        console.log(err)
      })
    }
  }

  async reserveBook() {
    this.userService.reserveBook(this.book.id, this.reservedDate).then((res: any) => {
      this.userService.sendMail(
        `Dear, ${this.actualUser.name}.`,
        `Reservation Book - ${this.book.title}`,
        `Devolution Date in 7 days - ${res.devolution}`
      ).then((res1 => {
        this.reservedDate = null
        this.actionOk()
        this.router.navigate(['/reserved-books'])
      })).catch(err => {
        console.log(err)
        this.actionError()
      })
    }).catch(err => {
      this.actionError()
      console.log(err)
    })
  }

  async updateBookInfo(){
    this.bookService.updateBookInfo(
      this.book.id,
      this.book.title,
      this.book.description,
      this.book.author,
      this.book.pages,
      this.book.quantity,
      this.book.status
    ).then(res => {
      this.actionOk()
      this.refresh()
    }).catch(err => {
      this.actionError()
      console.log(err)
    })
  }

  refresh() {
    window.location.reload()
  }

  logout(){
    this.userService.logout()
    this.router.navigate(['/home'])
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

  async actionOk(){
    const toaster = await this.toastController.create({
      message: 'OK - Action Successful',
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
}
