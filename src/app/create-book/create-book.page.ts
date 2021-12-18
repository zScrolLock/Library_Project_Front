import { Component, OnInit } from '@angular/core';
import { booksService } from '../app_API/books.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-book',
  templateUrl: './create-book.page.html',
  styleUrls: ['./create-book.page.scss'],
})
export class CreateBookPage implements OnInit {

  private book: any = {}
  private fileUpload: File | null = null

  constructor(private booksService: booksService, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    this.fileUpload = files.item(0);
}

  async registerMethod(){
    this.booksService.createBook(
      this.book.title,
      this.book.description,
      this.book.author,
      this.book.pages,
      this.book.quantity,
      this.fileUpload
    ).then(res => {
      this.router.navigate(['/books-list'])
      this.actionOk()
    }).catch(err => {
      this.actionError()
      console.log(err)
    })
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

