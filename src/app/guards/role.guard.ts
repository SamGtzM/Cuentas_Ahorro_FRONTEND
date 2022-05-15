import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  
  constructor(
    private authService: AuthService,
    public router: Router
  ){}

  canActivate(route: ActivatedRouteSnapshot):boolean{

    if (!this.authService.isAuth()) {
      console.log('Token no es válido o ya expiró');
      this.router.navigate(['login']);
      return false;
    } 
      return true;

  }
  
}
