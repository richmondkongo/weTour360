import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, Inject, ElementRef, ViewChild } from '@angular/core';
// import { AFrame, Entity, MultiPropertySchema, System, SystemDefinition, THREE, Geometry, registerComponent } from 'aframe';
import { VrService } from '../services/vr.service';
import { BiensImmobiliersService } from '../services/biens-immobiliers.service';
import { ImgVrService } from '../services/img-vr.service';
import { EntityService } from '../services/entity.service';
import { DOCUMENT } from '@angular/platform-browser';
import { JsService } from '../services/js.service';
declare var $: any;

@Component({
	selector: 'app-vr',
	templateUrl: './vr.component.html',
	styleUrls: ['./vr.component.scss']
})

export class VrComponent implements OnInit {
	point: string = null; // point vers lequelle doit être le sky
	vr: any = []; // liste des vr réalisées
	img: any = []; // liste des images
	bien: any = []; // liste des biens
	entity: any = []; // liste des entités
	@ViewChild('visit_virtuelle') vrView: ElementRef;

	constructor(
		@Inject(DOCUMENT) private doc: any,
		private vrServ: VrService,
		private bienServ: BiensImmobiliersService,
		private imgServ: ImgVrService,
		private js: JsService,
	) {
	}

	ngOnInit() {
		this.vrServ.getAllVisit().then(
			(res) => {
				this.vr = res;
			}, (err) => {
				console.error('réalité virtuelle:', err);
			}
		);

		this.imgServ.getAllImgVr().then(
			(res) => {
				this.img = res;
				for (let _img of this.img.results) {
					for (let _entity of _img.entities) {
						this.entity.push(_entity);
					}
				}
				console.log('vr aframe :', this.entity);
				setTimeout(
					()=> {
						this.js.load ('aframe'). then (data => {
							sessionStorage.entity = JSON.stringify(this.entity); // sauvegarde des différentes entités
							this.imgOfSky(this.img.results[0].id);
						}). catch (err => {console.error('jsService in vrcomponent:', err)});
				}, 5000);
			}, (err) => {
				console.error('réalité virtuelle:', err);
			}
		);
	}

	imgOfSky(idOfImg) {
		this.point = '#point' + idOfImg;
		let elt = this.doc.getElementById('skybox');
		elt.setAttribute('src', this.point);

		let elts = this.doc.querySelectorAll('#spots a-entity a-image');
		for (let i = 0; i < elts.length; i++) {
			if (idOfImg == this.entity[i].image_visite_virtuelle) {
				elts[i].setAttribute('spot', this.entity[i].spot);
				elts[i].setAttribute('position', this.entity[i].position);
			} else {
				elts[i].setAttribute('spot', '');
				elts[i].setAttribute('position', '');
			}
		}

	}

	ngAfterViewInit() {
	}

}