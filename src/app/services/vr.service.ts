import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VrService {
	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllVisit() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.visite_virtuelle, this.G.getHttpOptions()).subscribe(
					(res) => { 
						resolve(res);
					}, (err) => {
						console.error(this.G.link.visite_virtuelle);
						reject(err);
					}
				)
			}
		);
	}

	getVisitById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.visite_virtuelle + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addVisit(matricule: string, bien: string, par_wefly:string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.visite_virtuelle, { matricule, bien, par_wefly }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateVisit(id: string, matricule: string, bien: string, par_wefly:string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.visite_virtuelle + id + '/', { matricule, bien, par_wefly }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteVisit(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.visite_virtuelle + id + '/', this.G.getHttpOptions()).subscribe(
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