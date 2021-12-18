import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { userService } from '../app_API/user.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CanActivate {

  constructor(private router: Router, private userService: userService) { }

  async canActivate(): Promise<boolean> {

    if (!this.userService.isLogin()) {
      this.router.navigate(['/home']);
      return false;
    } else if(await this.userService.haveRole()){
        return true
    }
      this.router.navigate(['/books-list'])
      return false
  }
}
