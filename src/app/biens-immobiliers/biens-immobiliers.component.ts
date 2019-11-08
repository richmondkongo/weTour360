import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BiensImmobiliersService } from './../services/biens-immobiliers.service';
import { CategoriesService } from '../services/categories.service';
import { GlobalService } from './../services/global.service';
declare var $: any;

@Component({
	selector: 'app-biens-immobiliers',
	templateUrl: './biens-immobiliers.component.html',
	styleUrls: ['./biens-immobiliers.component.scss']
})
export class BiensImmobiliersComponent implements OnInit {
	bienIm: any = null;//liste de tout les biens
	bienMod: any = null; // bien immobilier à modifier
	categorie: any = null; // liste des catégories
	action: number = 1; // partie de du component à afficher 1 pour la liste, 2 pour modifier un bien, 3 pour ajouter un nouveau bien

	constructor(
		private categorieServ: CategoriesService,
		private biensServ: BiensImmobiliersService,
		private G: GlobalService,
	) { }

	ngOnInit() {
		//récupértion des catégories
		this.categorieServ.getAllCategories().then(
			(res) => {
				this.categorie = res;
			}, (err) => {
				console.error(err);
			}
		);

		// réupération des biens
		this.biensServ.getAllRealEstate().then(
			(res) => {
				this.bienIm = res;
			}, (err) => {
				console.error(err);
			}
		)

		// action du premier chargement
		this.action = 1;

		$(document).ready(function () {
			// pour le bouton flottant
			$('.fixed-action-btn').floatingActionButton({
				'direction': 'top',
				'hoverEnabled': false,
			});
		});
	}

	onSubmitBien(f: NgForm): void {
		if (localStorage.profil != null) {
			let user_id = null, catArray = [];

			// on parcourt la liste de catégorie afin de déterminer ceux qui ont été cocher ou pas
			for (let j = 0; j < this.categorie.length; j++) {
				if (f.value[this.categorie[j].id]) {
					// si la catégorie a été coché on l'ajout au tableau des catégories à suavegarder dans la base de donnée
					catArray.push(this.categorie[j].id);
				}
			}

			user_id = JSON.parse(localStorage.profil);
			this.biensServ.addRealEstate(f.value.libelle, ("TA001-" + this.G.getUserId()), f.value.long, f.value.larg, f.value.nbPiece, f.value.valeur, user_id.id, catArray).then(
				(res) => {
					this.ngOnInit();
				}, (err) => {
					console.error(err);
				}
			);
		} else {
			console.log('profil n\'est pas sauvegarder dans localStorage');
		}
	}

	viewPart(p: number, bien: any = null): void {
		// permet switcher entre la liste des biens(1), la modification d'un bien(2) et l'insertion(3)
		this.action = p;
		if (p == 1) {
			this.ngOnInit();
		}

		this.bienMod = (bien != null) ? bien : null;
	}

	deleteBien(bienD): void {
		console.log('id du bien à  delete:', bienD.id);
		this.biensServ.deleteRealEstate(bienD.id).then(
			(res) => {
				console.log(res);
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	onSubmitModBien(f: NgForm): void {
		if (localStorage.profil != null) {
			let user_id = null, catArray = [];

			for (let j = 0; j < this.categorie.length; j++) {
				// on parcourt la liste de catégorie afin de déterminer ceux qui ont été cocher ou pas
				if (f.value[this.categorie[j].id]) {
					// si la catégorie a été coché on l'ajout au tableau des catégorie à suavegarder dans la base de donnée
					catArray.push(this.categorie[j].id);
				}
			}

			user_id = JSON.parse(localStorage.profil);
			this.biensServ.updateRealEstate(this.bienMod.id, "TA001", f.value.libelle, f.value.long, f.value.larg, f.value.nbPiece, f.value.valeur, user_id.id, catArray).then(
				(res) => {
					// console.log(res);
					this.ngOnInit();
				}, (err) => {
					console.error(err);
				}
			);
		} else {
			console.log('profil n\'est pas sauvegarder dans localStorage');
		}
	}

	isChecked(categoryId): boolean {
		// utlisé pour le formulaire de modification, permet de savoir si une checkbox a été sélectionné ou pas
		return (this.bienMod.categories.indexOf(categoryId) >= 0) ? true : false;
	}

	selectCategorie(idOfCategorie): string {
		// on lui envoie l'id d'une catégorie et il retourne le libelle
		if (this.categorie != null) {
			// cette condition est nécessaire vu que parfois pour des souces de connection les données n'arrivent assez vite
			for (let elt of this.categorie) {
				if (elt.id == idOfCategorie) {
					return elt.libelle;
				}
			}
		} else {
			console.warn('connection trop lente');
		}
		return '';
	}
}
