import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../app_API/user.service';
import { booksService } from '../app_API/books.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reserved-books',
  templateUrl: './reserved-books.page.html',
  styleUrls: ['./reserved-books.page.scss'],
})
export class ReservedBooksPage {

  private reservedList: any;

  constructor(private userService: userService, private router: Router, private booksService: booksService, public toastController: ToastController) {
    this.userService.retrieveReserveds().then(res => {
      this.reservedList = res
      this.reservedList.map(a => {
        this.booksService.retrieveDetails(a.book_id).then((res1: any) => {
          a.book_name = res1.title
        }).catch(err => {
          this.actionError()
          console.log(err)
        })
      })
    }).catch(err => {
      this.actionError()
      console.log(err)
    })
  }

  getIndex(i: any){
    console.log(i)
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
