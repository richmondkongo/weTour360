import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as jwt_decode from 'jwt-decode';

import { GlobalService } from './global.service';

@Injectable({
   providedIn: 'root'
})
export class LoginGuardService {
   postman = { 'username': 'postman', 'password': 'PostmaNBoyWefly52' }
   httpOptions = {
      headers: new HttpHeaders(
         {
            'Content-Type': 'application/json',
         }
      )
   };

   constructor(
      private G: GlobalService,
      private router: Router,
      private httpClient: HttpClient,
   ) {
   }

   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      // vérifie à chaque fois si l'utilisateur est connecté
      if (localStorage.token != null) {
         let tkDecode = jwt_decode(localStorage.token); // décodage du token
         // on vérifie si le token existe et aussi sa date d'expiration n'est pas encore arrivé
         console.log("lien:", document.location.href, '\n\n');
         return true;
      } else {
         sessionStorage.msgLogin = 'Veuillez-vous connecter en premier lieu.';
         this.router.navigate(['/login']);
      }
   }

   login(username: string, password: string): any {
      // fonction de connection qui va rechercher le token sur l'api
      return new Promise(
         (resolve, reject) => {
            this.httpClient.post<any>(this.G.link.token, { username, password }, this.httpOptions).subscribe(
               (res) => {
                  localStorage.token = res.access;
                  resolve(res);
               }, (err) => {
                  reject(err);
                  console.log('erreur avec le token: ', err);
               }
            )
         }
      );
   }

   sendMailToResetMdp(email: string) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.post<any>(this.G.link.send_email, { email }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.sent);
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

   resetMdp(token: string, password: string) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.post<any>(this.G.link.reset_password, { token, password }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  console.log("login-result:", res);
                  resolve(res);
               }, (err) => {
                  console.log("login-result:", err);
                  reject(err);
               }
            )
         }
      );
   }

   logout() {
      console.log('logout');
      if (localStorage.token != null) {
         localStorage.removeItem('token');
         localStorage.removeItem('profil');
         localStorage.clear();
      }
   }

   logged() {
      return (localStorage.token != null) ? true : false;
   }

}