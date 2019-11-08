import { Component, OnInit } from '@angular/core';
import * as three from 'three';
import * as panolens from 'panolens';

@Component({
	selector: 'app-visite',
	templateUrl: './visite.component.html',
	styleUrls: ['./visite.component.scss']
})

/*
ng serve --ssl true --ssl-key /node_modules/browser-sync/lib/server/certs/server.key --ssl-cert /node_modules/browser-sync/lib/server/certs/server.crt --host 0.0.0.0 --port 3000 -o

https://github.com/pchen66/panolens.js/issues/160
*/

export class VisiteComponent implements OnInit {
	linkTo: Hotspot[];
	panoImg: string[];
	infospot: Ispot[];

	constructor() { }

	ngOnInit() {
		this.linkTo = [
			{ from: 0, to: 1, x: -8000, y: -2000, z: -4414 }, 
			{ from: 0, to: 2, x: 3486, y: -313.08, z: 3560 },
			{ from: 0, to: 3, x: -2536.6, y: -762.46, z: 4235.8 },
			{ from: 0, to: 4, x: -4500, y: 1700, z: 1306 },
			{ from: 0, to: 5, x: -4000, y: 865, z: 2920 },
			{ from: 1, to: 0, x: 3308.10, y: 852.92, z: -3646.46 },
			{ from: 2, to: 0, x: 4008, y: -97, z: -3000 },
			{ from: 3, to: 0, x: 3411.39, y: -300.78, z: -3633.3 },
			{ from: 4, to: 0, x: -3833.51, y: -370.78, z: 3177.09 },
			{ from: 5, to: 0, x: 41.26, y: -465.58, z: -4975 },
		];
		// 3486.43, -313.08, 3557.57
		this.panoImg = [
			'assets/visite/salon-salle-a-manger.png',
			'assets/visite/salle-de-detente.jpg',
			'assets/visite/independance.jpg',
			'assets/visite/chambre-parents.jpg',
			'assets/visite/chambre-musik.jpg',
			'assets/visite/chambre-gamer.jpg',
		];

		this.infospot = [
			{ img: 0, x: -8000, y: -2300, z: -4414, info: 'Grand salon' }, 
			{ img: 0, x: 3486, y: -613.08, z: 3560, info: 'Dépendance' },
			{ img: 0, x: -2536.6, y: -1062.46, z: 4235.8, info: 'Chambre parentale' },
			{ img: 0, x: -4500, y: 1400, z: 1306, info: 'chambre des invités' },
			{ img: 0, x: -4000, y: 565, z: 2920, info: 'chambre du dev' },
			{ img: 1, x: 3308.10, y: 552.92, z: -3646.46, info: 'Petit salon & salle à manger' },
			{ img: 2, x: 4008, y: -697, z: -3000, info: 'Petit salon & salle à manger' },
			{ img: 3, x: 3411.39, y: -900.78, z: -3633.3, info: 'Petit salon & salle à manger' },
			{ img: 4, x: -3833.51, y: -970.78, z: 3177.09, info: 'Petit salon & salle à manger' },
			{ img: 5, x: 41.26, y: -1065.58, z: -4975, info: 'Petit salon & salle à manger' },


			// { img: , x: , y: , z: , info: '' },
			{ img: 0, x: -587.32, y: -964.64, z: -4863, info: 'Avez-vous une petite faim ?' },
			{ img: 0, x: 4780.87, y: 1058.60, z: 996.92, info: 'Le petit salon' },
		]
		this.startView(this.panoImg, this.linkTo, this.infospot);

	}

	startView(img: string[], link: Hotspot[], infoS: Ispot[]=[]) {
		/*
		 * 
		 * cette fonction permet de lancer véritablement le panorama
		 * args:
		 * 	img: tableau de string contenannt le lien de 
		 * 			toutes les images de la visite virtuelle
		 * 	link: lien entre les différentes images de la vr, 
		 * 			il est de type Link dont la définition se trouve tout en bas
		 */
		this.setCSS();
		var p: panolens.ImagePanorama[] = [];
		img.forEach((item, index) => {
			p.push(new panolens.ImagePanorama(item));
			
		});

		var sky = new panolens.Viewer({output: 'console'});

		// infospot
		var info = new panolens.Infospot();
		info.position.set(this.infospot[0].x, this.infospot[0].y, this.infospot[0].z)
		info.addHoverText(this.infospot[0].info);
		p[0].add(info);

		// linkspot
		p.forEach((item, index) => {
			// console.log("---liste des lien de la page ayant pour index", index," ---\n")
			link.forEach((lk, ind) => {
				if (lk.from == index) {
					// console.log("from", lk.from, '\nto:', lk.to);
					item.link(p[lk.to], new three.Vector3(lk.x, lk.y, lk.z));
				}
			});

			if((infoS != null)&&(infoS!=[])) {
				infoS.forEach((inf, indice) => {
					if (index == inf.img) {
						item.add(this.addIspot(inf));
					}
				});
			}

			// item.link(p[link[index].to], new three.Vector3(link[index].x, link[index].y, link[index].z));
			item.addEventListener('progress', this.onProgress);
			item.addEventListener('enter', this.onEnter);

			sky.add(item);
		});
	

	}

	addIspot(infospot: Ispot) {
		var info = new panolens.Infospot();
		info.position.set(infospot.x, infospot.y, infospot.z);
		info.addHoverText(infospot.info);
		return <panolens.Infospot>info;

	}

	setCSS() {
		/* 
		 *
		 * Permet que le panorama prenne toute la page et 
		 * le rend visible car sans celà ça ne fonctionnerait pas, 
		 * il est tout à fait possible de le faire directement dans le css
		 */
		var body = document.querySelector('body');
		var html = document.querySelector('html');

		body.style.width = '100%';
		body.style.height = '100%';
		body.style.overflow = 'hidden';
		body.style.margin = '0px';
		body.style.backgroundColor = '#646B63';

		html.style.width = '100%';
		html.style.height = '100%';
	}

	onEnter(event) {
		/*
		 *
		 * utilisé lors du chargement de la page 
		 * ou lorsqu'on veut aller au panorama suivant
		 */
		var progressElement;
		progressElement = document.getElementById('progress');
		progressElement.style.width = 0;
		progressElement.classList.remove('finish');
	}

	onProgress(event) {
		/*
		 * utilisé lors du chargement de la page 
		 * ou lorsqu'on veut aller au panorama suivant
		 */
		var progress, progressElement;
		progressElement = document.getElementById('progress');
		progress = event.progress.loaded / event.progress.total * 100;
		progressElement.style.width = progress + '%';
		if (progress === 100)
			progressElement.classList.add('finish');
	}
}

export class Hotspot {
	/*
	 *
	 * type de la variable
	 */
	
	// image de départ
	from: number;

	// image vers laquelle on doit aller
	to: number;

	// positionnement du spot de direction dans l'image par des coordonnées (x, y, z) 
	x: number;
	y: number;
	z: number;
}

export class Ispot {
	/*
	 *
	 * formatage des infospots
	 */

	// image sur laquelle le hotspot doit être posé
	img: number;

	// positionnement de l'infospot par des coordonnées (x, y, z) 
	x: number;
	y: number;
	z: number;

	// texte à afficher
	info: string;
}