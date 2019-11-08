import { Component, OnInit } from '@angular/core';
import * as three from 'three';
import * as panolens from 'panolens';

@Component({
	selector: 'app-vis-vr',
	templateUrl: './vis-vr.component.html',
	styleUrls: ['./vis-vr.component.scss']
})
export class VisVRComponent implements OnInit {
	link: Link[];
	img: string [];

	constructor() { }

	ngOnInit() {
		this.link = [
			{'to': 1, 'x':-2302.98, 'y':358.27, 'z':-4414.74},
			{'to': 0, 'x':-2302.98, 'y':358.27, 'z':-4414.74},
		];
		
		this.img = [ 
			'assets/views/1.jpg', 
			'assets/views/2.jpg', 
		];
		this.startView(this.img, this.link);

	}

	startView(img: string[], link: Link[]) {
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

		var sky = new panolens.Viewer();
		p.forEach((item, index) => {
			item.link(p[link[index].to], new three.Vector3(link[index].x, link[index].y, link[index].z));
			item.addEventListener('progress', this.onProgress);
			item.addEventListener('enter', this.onEnter);
			sky.add(item);
		})
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

export class Link {
	/*
	 *
	 * type de la variable 
	 */
	// image vers laquelle on doit aller
	to: number; 	
	// positionnement du spot de direction dans l'image par des coordonnées (x, y, z) 
	x: number; 
	y: number; 
	z: number;
}