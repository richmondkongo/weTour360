import { CategoriesService } from '../services/categories.service';
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
	selector: 'app-categorie',
	templateUrl: './categorie.component.html',
	styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
	action: number = 1; // partie de du component à afficher 1 pour la liste, 2 pour modifier un bien, 3 pour ajouter un nouveau bien
	categories: any = null;
	categoryMod; any = null;

	constructor(
		private G: GlobalService,
		private categorieServ: CategoriesService,
	) { }

	ngOnInit() {
		this.categorieServ.getAllCategories().then(
			(res) => {
				this.categories = res;
			}, (err) => {
				console.error(err);
			}
		)

		this.action = 1;

		$(document).ready(function () {
			// pour le bouton flottant
			$('.fixed-action-btn').floatingActionButton({
				'direction': 'top',
				'hoverEnabled': false,
			});
		});
	}

	onSubmitCategory(f: NgForm) {
		console.log('valeurs envoyées:', f.value);
		this.categorieServ.addCategories(f.value.libelle).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	onSubmitModCategory(f: NgForm) {
		console.log('valeurs envoyées:', f.value);
		this.categorieServ.updateCategories(this.categoryMod.id, f.value.libelle).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	viewPart(p: number, cat: any = null): void {
		// permet switcher entre la liste des biens(1), la modification d'un bien(2) et l'insertion(3)
		this.action = p;
		if (p == 1) {
			this.ngOnInit();
		}
		this.categoryMod = (cat != null) ? cat : null;
	}

	deleteCategory(categoryD) {
		console.log('category à delete:', categoryD);
		this.categorieServ.deleteCategories(categoryD.id).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	goToListOfBiens() {
		console.log('liste des biens appartenant à cette catégorie');
	}
}
