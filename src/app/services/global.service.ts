import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  	providedIn: 'root'
})
export class GlobalService {
	statuts: string[] = ['sarl', 'sa', 'sas'];
	postman = { 'username': 'postman', 'password': 'PostmaNBoyWefly52' };
	tkDecode: any = null;
	ip: string = 'http://178.33.130.195:8002/'; // adrese du serveur et le port
   link: any = {
      'token': this.ip + 'api/get_token/',
      'users': this.ip + 'api/noyau/users/',
      'entreprises': this.ip + 'api/noyau/entreprises/',
      'groupes_entreprises': this.ip + 'api/noyau/groupes_entreprises/',
      'biens_immobiliers': this.ip + 'api/noyau/biens_immobiliers/',
      'categories_de_bien': this.ip + 'api/noyau/categories_de_bien/',
      'adresse': this.ip + 'api/noyau/adresses/',
      'numero': this.ip + 'api/noyau/numeros/',
      'profils': this.ip + 'api/noyau/profils/',
      'reset_password': this.ip + 'change_password/', // lien pour changer le mdp dans l'api: reset_password/var_token/var_new_password
      'send_email': this.ip + 'send_email/', // pour l'envoie de lien de changement de mdp: send_mail/var_mail

      'visite_virtuelle': this.ip + 'api/visite_virtuelle/visite_virtuelle/',
      'img_vr': this.ip + 'api/visite_virtuelle/image_visite_virtuelle/',
      'entity': this.ip + 'api/visite_virtuelle/entity/',
   }; // objet contenant tout les liens relatifs à l'api de l'application 
	constructor(
   ) { }
	
	getUserId() {
      if(localStorage.token != null) {
         this.tkDecode = jwt_decode(localStorage.token);
         return this.tkDecode.user_id;
      } else {
         return null;
      }
   }

   getHttpOptions () {
      const httpOptions = {
         headers: new HttpHeaders({
            'Content-Type' :  'application/json',
            'Authorization': 'Bearer ' + localStorage.token,
         })
      };
      
      return httpOptions;
   }
}
