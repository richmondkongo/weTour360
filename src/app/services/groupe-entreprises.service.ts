import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class GroupeEntreprisesService {

	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllGpEntreprises() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.groupes_entreprises, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	getGpEntreprisesById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.groupes_entreprises + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addGpEntreprises(nom_du_groupe: string, matricule: string, entreprises: string[]) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.groupes_entreprises, { nom_du_groupe, matricule, entreprises }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateGpEntreprises(id: string, nom_du_groupe: string, matricule: string, entreprises: string[]) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.groupes_entreprises + id + '/', { nom_du_groupe, matricule, entreprises }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteGpEntreprises(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.groupes_entreprises + id + '/', this.G.getHttpOptions()).subscribe(
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
