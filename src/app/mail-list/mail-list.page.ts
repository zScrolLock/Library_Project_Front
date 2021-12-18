import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../app_API/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.page.html',
  styleUrls: ['./mail-list.page.scss'],
})
export class MailListPage implements OnDestroy {

  private mailsList: any;

  constructor(private userService: userService, private router: Router, public toastController: ToastController) { 
    this.userService.retrieveMails().then(res => {
      this.mailsList = res
    }).catch(err => {
      this.actionError()
      console.log(err)
    })
  }

  ngOnDestroy(): void {
      
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
