import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class CategoriesService {

	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllCategories() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.categories_de_bien, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	getCategoriesById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.categories_de_bien + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res.results[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addCategories(libelle: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.categories_de_bien, { libelle }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateCategories(id: string, libelle: string = null) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.categories_de_bien + id + '/', { libelle }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteCategories(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.categories_de_bien + id + '/', this.G.getHttpOptions()).subscribe(
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
