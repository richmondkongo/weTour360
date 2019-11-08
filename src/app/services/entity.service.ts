import { Injectable } from '@angular/core';
import { GlobalService } from './global.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
		private G: GlobalService,
		private httpClient: HttpClient,
	) { }

	getAllEntity() {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.entity, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						console.error(this.G.link.entity);
						reject(err);
					}
				)
			}
		);
	}

	getEntityById(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.get<any>(this.G.link.entity + '?id=' + id, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res[0]);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	addEntity(image_visite_virtuelle: string, type: string, position: string, spot: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.post<any>(this.G.link.entity, { image_visite_virtuelle, type, position, spot }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	updateEntity(id: string, image_visite_virtuelle: string, type: string, position: string, spot: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.put<any>(this.G.link.entity + id + '/', { image_visite_virtuelle, type, position, spot }, this.G.getHttpOptions()).subscribe(
					(res) => {
						resolve(res);
					}, (err) => {
						reject(err);
					}
				)
			}
		);
	}

	deleteEntity(id: string) {
		return new Promise(
			(resolve, reject) => {
				this.httpClient.delete<any>(this.G.link.entity + id + '/', this.G.getHttpOptions()).subscribe(
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