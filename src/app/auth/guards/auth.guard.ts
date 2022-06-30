import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor(private authService: AuthService,
              private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
      return this.authService.verificarAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado ){
            this.router.navigate(['./auth/login']);
            console.log('Bloqueado por AutGuard - CanActivate');
          }
        })
      );
    // if (this.authService.auth.id){
    //     return true;
    // }

    // console.log('Bloqueado por AutGuard - CanActivate');
    // return false;
  }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {
      return this.authService.verificarAutenticacion()
      .pipe(
        tap( estaAutenticado => {
          if( !estaAutenticado ){
            this.router.navigate(['./auth/login']);
            console.log('Bloqueado por AutGuard - CanLoad');
          }
        })
      );
    // if (this.authService.auth.id){
    //   return true;
    // }

    // console.log('Bloqueado por AutGuard - CanLoad');
    // return false;
  }
}
