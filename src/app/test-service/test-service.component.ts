import { LoginGuardService } from './../services/login-guard.service';
import { EntrepriseService } from './../services/entreprise.service';
import { CategoriesService } from '../services/categories.service';
import { ProfilService } from './../services/profil.service';
import { BiensImmobiliersService } from './../services/biens-immobiliers.service';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NumeroService } from '../services/numero.service';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';

import { JsService } from '../services/js.service';

@Component({
	selector: 'app-test-service',
	templateUrl: './test-service.component.html',
	styleUrls: ['./test-service.component.scss']
})
export class TestServiceComponent implements OnInit {
	user: any;
	file: File = null; 
	htmlToAdd: string = null;
	@ViewChild('one') d1: ElementRef;
	constructor(
		private js: JsService,
		@Inject(DOCUMENT) private doc: any,
		private l: LoginGuardService,
		private bien: BiensImmobiliersService,
		private profil: ProfilService,
		private cat: CategoriesService,
		private G: GlobalService,
		private httpClient: HttpClient,
		private ent: EntrepriseService,
		private num: NumeroService,
	) { }

	ngOnInit() {
		this.js.load('tjs').then(data => {
			// Script chargé avec succès
		}).catch(error => console.log(error));
		/*
		this.htmlToAdd = '<div class="two" style="background: red"><a href="https://facebook.com">clique</a><img src="http://178.33.130.195:8002/media/1.jpg"></div>';
		this.d1.nativeElement.insertAdjacentHTML('beforeend', this.htmlToAdd);
		*/
		/*
		let elt = this.doc.getElementById('skybox');
		elt.setAttribute('href', 'https://facebook.com');
		*/
		this.convertToSvg();
	}
	/*	
		@ViewChild('one') d1:ElementRef;
		ngAfterViewInit() {
			this.d1.nativeElement.insertAdjacentHTML('beforeend', '<div class="two" style="background: red;">two</div>');
		}
	*/
	selectedFile: any = null;
	img: string = null;
	onFileChanged(event) {
		// this.selectedFile = <File>event.target.files[0];
		const reader = new FileReader();
		if (event.target.files && event.target.files.length > 0) {
			const file = event.target.files[0];
			reader.readAsDataURL(file);
			reader.onload = () => {
				this.selectedFile = reader.result;
				console.clear();
				console.log('file: ', btoa(this.selectedFile));
			};
		}
	}

	onUpload() {
		//const fd = new FormData();
		//fd.append('image', this.selectedFile, this.selectedFile.name);
	}

	convertToSvg() { 
	}
}
