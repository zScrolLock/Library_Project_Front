import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userService } from '../app_API/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService implements CanActivate {

  constructor(private router: Router, private userService: userService) { }

  canActivate(): boolean {

    if (!this.userService.isLogin()) {
      this.router.navigate(['/home']);
      return false;
    }
    return true;
  }

  haveRole(): boolean {
    if(this.userService.haveRole()){
      return true
    }
    return false
  }
}
