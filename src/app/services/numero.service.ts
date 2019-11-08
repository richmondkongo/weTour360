import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class NumeroService {

	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllNumero() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.numero, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	getNumeroById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.numero + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addNumero(utilisateur: string=null, entreprise: string=null, groupe_entreprise: string=null, numero: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.numero, { utilisateur, entreprise, groupe_entreprise, numero }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}, () => {
						
					}
				)
			}
		);
	}

	updateNumero(id: string, utilisateur: string=null, entreprise: string=null, groupe_entreprise: string=null, numero: string=null) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.numero + id + '/', { utilisateur, entreprise, groupe_entreprise, numero }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteNumero(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.numero + id + '/', this.G.getHttpOptions()).subscribe(
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
