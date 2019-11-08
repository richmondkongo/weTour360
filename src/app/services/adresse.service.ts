import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdresseService {

	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllAdresse() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.adresse, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	getAdresseById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.adresse + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addAdresse(utilisateur: string=null, entreprise: string=null, groupe_entreprise: string=null, pays: string=null, ville: string=null, commune: string=null, quartier: string=null, coordonnee) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.adresse, { utilisateur, entreprise, groupe_entreprise, pays, ville, commune, quartier }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateAdresse(id: string,utilisateur: string=null, entreprise: string=null, groupe_entreprise: string=null, pays: string=null, ville: string=null, commune: string=null, quartier: string=null, coordonnee) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.adresse + id + '/', { utilisateur, entreprise, groupe_entreprise, pays, ville, commune, quartier }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteAdresse(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.adresse + id + '/', this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}
}