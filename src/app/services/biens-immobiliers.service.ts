import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GlobalService } from './global.service';

@Injectable({
   providedIn: 'root'
})
export class BiensImmobiliersService {

   constructor(
      private G: GlobalService,
      private httpClient: HttpClient,
   ) {
   }

   getAllRealEstate() {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.biens_immobiliers, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.results);
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

   getRealEstateById(id: string) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.biens_immobiliers + '?id=' + id, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.results[0]);
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

   getRealEstateByMatricule(mat: string) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.get<any>(this.G.link.biens_immobiliers + '?matricule=' + mat, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res.results[0]);
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

   addRealEstate(libelle: string, matricule: string, longueur_superficie: number, largeur_superficie: number, nombre_pieces: number, valeur: number, utilisateur: string, categories: number[]) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.post<any>(this.G.link.biens_immobiliers, { libelle, matricule, longueur_superficie, largeur_superficie, nombre_pieces, valeur, utilisateur, categories }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res);  
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

   updateRealEstate(id: string, matricule: string, libelle: string, longueur_superficie: string, largeur_superficie: string, nombre_pieces: string, valeur: string,  utilisateur: string, categories: number[]) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.put<any>(this.G.link.biens_immobiliers + id + '/', { libelle, matricule, longueur_superficie, largeur_superficie, nombre_pieces, valeur, utilisateur, categories }, this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res);
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

   deleteRealEstate(id: string) {
      return new Promise(
         (resolve, reject) => {
            this.httpClient.delete<any>(this.G.link.biens_immobiliers + id + '/', this.G.getHttpOptions()).subscribe(
               (res) => {
                  resolve(res);
                  console.log(res);
               }, (err) => {
                  reject(err);
               }
            )
         }
      );
   }

}
