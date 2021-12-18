import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../app_API/user.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private newUser: any = {}
  private adminCode: string = ''

  constructor(private userService: userService, private router: Router, public toastController: ToastController) { }

  ngOnInit() {
  }

  async registerMethod(){
    this.userService.registerUser(
      this.newUser.first_name,
      this.newUser.last_name,
      this.newUser.email,
      this.newUser.username,
      this.newUser.password,
      this.adminCode
    ).then(res => {
      this.router.navigate(['/home'])
      this.actionOk()
    }).catch(err => {
      this.actionError()
      console.log(err)
    })
  }

  valide_fields(){
    if(this.newUser.first_name){
      if(this.newUser.last_name){
        if(this.newUser.email){
          if(this.newUser.username){
            if(this.newUser.password){
              return false
            }
          }
        }
      }
    }
    return true
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
