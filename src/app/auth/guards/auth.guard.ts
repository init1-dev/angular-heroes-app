import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivate {

  constructor( private authService: AuthService,
               private router: Router ) {}

  // state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

  authCheck() {
    return this.authService.authCheck()
            .pipe(
              tap( isAuthenticated => {
                if(!isAuthenticated){
                  this.router.navigate(['/auth']);
                }
              })
            )
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      return this.authCheck();
    
    //   if( this.authService.auth.id ){
    //     return true;
    //   }
    //   console.log('AUTH_GUARD:blocked:canActivate')
    // return false;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | boolean {

      return this.authCheck();
      
    //   if( this.authService.auth.id ){
    //     return true;
    //   }
    //   console.log("AUTH_GUARD:blocked:canLoad")
    // return false;
  }
}
