import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

  	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllEntreprises() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.entreprises, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	getEntreprisesById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.entreprises + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addEntreprises(nom: string, matricule: string, statut: string, activite: string, utilisateurs: string[]) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.entreprises, { nom, matricule, statut, activite, utilisateurs }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateEntreprises(id: string, nom: string, matricule: string, statut: string, activite: string, utilisateurs: string[]) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.entreprises + id + '/', { nom, matricule, statut, activite, utilisateurs }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteEntreprises(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.entreprises + id + '/', this.G.getHttpOptions()).subscribe(
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
