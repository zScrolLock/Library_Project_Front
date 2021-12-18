import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { userService } from '../app_API/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage  {

  private user: any = {}

  constructor(private userService: userService, private router: Router, public toastController: ToastController) { 
    this.userService.getUser().then((res => {
      this.user = res
    })).catch((err) => {
      this.actionError()
      console.log(err)
    })
  }

  async getInfos(){
    this.userService.updateUserInfo(this.user.first_name, this.user.last_name, this.user.email).then(res => {
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
