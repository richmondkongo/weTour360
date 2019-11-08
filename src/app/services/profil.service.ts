import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { GlobalService } from './global.service';

@Injectable({
  	providedIn: 'root'
})
export class ProfilService {
  	constructor(
      private G: GlobalService,
      private router: Router, 
      private httpClient: HttpClient,
	) { 
  	}

	getAllUser() {
		return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.users, this.G.getHttpOptions()).subscribe(
               (res) => {
                  for(let i=0; i < res.results.length; i++) {
                     // boucle permettant de retirer postman de la liste des users
                     if (res.results[i].username == this.G.postman.username) {
                        res.results.splice(i, 1);
                        break;
                     } else {
                        continue;
                     }
                  }
                  resolve(res.results);
               }, (err) => {
                  reject(err); 
               }
            )
         }
      );
	}

	getOneUser(id: string) {
		return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.users + '?id=' + id, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.results[0]);
               }, (err) => {
                  reject(err); 
               }
            )
         }
      );
   }

   addUser(username: string=null, last_name: string=null, first_name: string=null, email: string=null, profil: any, is_staff: boolean=false) {
      let password: string = email + '-' + username;
      return new Promise(
         (resolve, reject) => {
            this.httpClient.post<any>(this.G.link.users, { username, last_name, first_name, email, profil, is_staff, password }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  // console.log(res);
                  resolve(res);
               }, (err) => {
                  // console.error(err);
                  reject(err);
               }
            );
         }
      );
   }

   updateUser(id: string, username: string=null, last_name: string=null, first_name: string=null, email: string=null, profil: any, is_staff: boolean=false) {
      let password: string = email + '-' + username;
      return new Promise(
         (resolve, reject) => {
            this.httpClient.put<any>(this.G.link.users + id + '/', { username, last_name, first_name, email, profil, is_staff, password }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  // console.log(res);
                  resolve(res);
               }, (err) => {
                  // console.error(err);
                  reject(err);
               }
            );
         }
      );
   }

   deleteUser(userId) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.delete<any>(this.G.link.users + userId + '/', this.G.getHttpOptions()).subscribe(
               (res) => {
                  console.log(res);
                  resolve(res);
               }, (err) => {
                  console.error(err);
                  reject(err);
               }
            )
         }
      );
   }
   
   getAllProfil() {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.profils, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.results);
               }, (err) => {
                  reject(err); 
               }
            )
         }
      );
   }

   getProfilById(user_id: string) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.profils + '?utilisateur=' + user_id, this.G.getHttpOptions()).subscribe(
               (res) => {
                  // sauvegarde du profil du user connecté actuellement
                  localStorage.profil = JSON.stringify(res.results[0]);
                  resolve(res.results[0]);
               }, (err) => {
                  reject(err); 
               }
            )
         }
      );
   }

   addProfil(utilisateur: string, matricule: string, photo: any) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.post<any>(this.G.link.profils, { utilisateur, matricule, photo }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.results);
               }, (err) => {
                  reject(err); 
               }
            )
         }
      );
   }
}

export interface typeProfil {
   matricule: string;
   adresses?: any;
   numeros?: any;
   photo?: string;
}