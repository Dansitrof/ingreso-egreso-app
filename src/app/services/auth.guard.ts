import { Injectable } from '@angular/core';
import { CanActivate, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { tap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

 constructor( private authService: AuthService,
              private router: Router ) {

 }

 canLoad(): Observable <boolean> {

  return this.authService.isAuth()
  .pipe(
    tap( estado => {
      if (!estado) {
        console.log('estado', estado);
        this.router.navigateByUrl('/login');
      }
    }),
    take(1)
  );

}

  canActivate(): Observable <boolean> {

    return this.authService.isAuth()
    .pipe(
      tap( estado => {
        if (!estado) {
          console.log('estado', estado);
          this.router.navigateByUrl('/login');
        }
      })
    );

  }

}
