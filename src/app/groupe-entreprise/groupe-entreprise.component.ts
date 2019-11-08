import { EntrepriseService } from './../services/entreprise.service';
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GroupeEntreprisesService } from '../services/groupe-entreprises.service';
declare var $: any;

@Component({
	selector: 'app-groupe-entreprise',
	templateUrl: './groupe-entreprise.component.html',
	styleUrls: ['./groupe-entreprise.component.scss']
})

/*
 * l'utilisation de certaines classes pour le collapse fait apparaître des avertissements dans la console, 
 * mais cela n'empêche pas l'application de fonctionner comme il se doit.
 */


export class GroupeEntrepriseComponent implements OnInit {
	gpEntreprises: any = null;//liste de toutes les entreprise
	gpEntrepriseMod: any = null; // entreprise à modifier
	statuts: string[];
	allEnterprises: any = null;
	action: number = 1; // partie de du component à afficher 1 pour la liste, 2 pour modifier un bien, 3 pour ajouter un nouveau bien
	collapseTab: boolean[] = []; // permet de savoir si le collapse de chaque groupe est ouvert ou pas

	constructor(
		private gpEntreprisesServ: GroupeEntreprisesService,
		private entrepriseServ: EntrepriseService,
		private G: GlobalService,
	) { }

	ngOnInit() {
		this.statuts = this.G.statuts;
		this.entrepriseServ.getAllEntreprises().then(
			(res) => {
				this.allEnterprises = res;
			}, (err) => {
				console.error(err);
			}
		);

		// réupération des entreprises
		this.gpEntreprisesServ.getAllGpEntreprises().then(
			(res) => {
				this.gpEntreprises = res;
				for (let j = 0; j < this.gpEntreprises.length; j++) {
					this.collapseTab.push(false); // on ajoute un nouvaux collapse ans le tableau qui aura pour valeur false 
				}
			}, (err) => {
				console.error(err);
			}
		);

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

	openCollapse(group): void {
		// 
		this.collapseTab[this.gpEntreprises.indexOf(group)] = !this.collapseTab[this.gpEntreprises.indexOf(group)];
	}

	onSubmitGpEntreprises(f: NgForm): void {
		console.log(f.value);
		let user_id = null, entArray = [];

		for (let j = 0; j < this.allEnterprises.length; j++) {
			// on parcourt la liste des entreprises afin de déterminer ceux qui ont été cocher ou pas
			if (f.value[this.allEnterprises[j].id]) {
				// si la catégorie a été coché on l'ajout au tableau des entreprises à suavegarder dans la base de donnée
				entArray.push(this.allEnterprises[j].id);
			}
		}

		this.gpEntreprisesServ.addGpEntreprises(f.value.nom_du_groupe, ('mat-' + f.value.nom_du_groupe), entArray).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	viewPart(p: number, ent: any = null): void {
		// permet switcher entre la liste des biens(1), la modification d'un bien(2) et l'insertion(3)
		this.action = p;
		if (p == 1) {
			this.ngOnInit();
		}
		this.gpEntrepriseMod = (ent != null) ? ent : null;
	}

	deleteGpEnterpise(entrepriseD): void {
		this.gpEntreprisesServ.deleteGpEntreprises(entrepriseD.id).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	onSubmitModEntreprise(f: NgForm): void {
		let entArray = [];

		for (let j = 0; j < this.allEnterprises.length; j++) {
			// on parcourt la liste des entreprises afin de déterminer celle qui ont été cocher ou pas
			if (f.value[this.allEnterprises[j].id]) {
				// si l'entreprise a été coché on l'ajout au tableau des catégorie à suavegarder dans la base de donnée
				entArray.push(this.allEnterprises[j].id);
			}
		}
		this.gpEntreprisesServ.updateGpEntreprises(this.gpEntrepriseMod.id, f.value.nom, this.gpEntrepriseMod.matricule, entArray).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	isChecked(entrepriseId): boolean {
		return (this.gpEntrepriseMod.entreprises.indexOf(entrepriseId) >= 0) ? true : false;
	}
}
