import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
	providedIn: 'root'
})
export class ImgVrService {

	constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllImgVr() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.img_vr, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						console.error(this.G.link.img_vr);
						reject(err);
					}
				)
			}
		);
	}

	getImgVrById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.img_vr + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addImgVr(matricule: string, bien: string, par_wefly: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.img_vr, { matricule, bien, par_wefly }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateImgVr(id: string, matricule: string, bien: string, par_wefly: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.img_vr + id + '/', { matricule, bien, par_wefly }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteImgVr(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.img_vr + id + '/', this.G.getHttpOptions()).subscribe(
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