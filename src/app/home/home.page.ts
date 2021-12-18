import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { userService } from '../app_API/user.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  password: string;

  constructor(private userService: userService, private router: Router, public toastController: ToastController, private storage: Storage) {}

  async login() {
    const user = {
      username: this.username,
      email: this.username,
      password: this.password,
    }

    if(this.username.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
      delete user.username
    }

    this.userService.login(user).then((res: any) => {
      this.storage.set('setting: token', res.token)
      this.loginOK()

      this.router.navigate(['/books-list']);
      this.username = ''
      this.password = ''

    }).catch(err => {
      this.loginFAIL()
    })
  }

  async register() {
    this.router.navigate(['/register'])
  }

  async loginOK(){
    const toaster = await this.toastController.create({
      message: 'Welcome to the Library',
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

  async loginFAIL(){
    const toaster = await this.toastController.create({
      message: 'Login failed',
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
}
