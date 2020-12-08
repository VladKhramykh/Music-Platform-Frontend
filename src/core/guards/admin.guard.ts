import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate() {
    const currentUser = this.authService.getUser();
    if (currentUser.user.id === 1) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
