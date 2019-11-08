import { ProfilService } from './../services/profil.service';
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EntrepriseService } from '../services/entreprise.service';
declare var $: any;

@Component({
	selector: 'app-entreprise',
	templateUrl: './entreprise.component.html',
	styleUrls: ['./entreprise.component.scss']
})
export class EntrepriseComponent implements OnInit {
	entreprises: any = null;//liste de toutes les entreprise
	entrepriseMod: any = null; // entreprise à modifier
	employes: any = [];
	allProfil: any = null;
	statuts: string[];
	action: number = 1; // partie de du component à afficher 1 pour la liste, 2 pour modifier un bien, 3 pour ajouter un nouveau bien
	constructor(
		private userServ: ProfilService,
		private entrepriseServ: EntrepriseService,
		private profilServ: ProfilService,
		private G: GlobalService,
	) { }

	ngOnInit() {
		this.statuts= this.G.statuts;
		// réupération des entreprises
		this.entrepriseServ.getAllEntreprises().then(
			(res) => {
				this.entreprises = res;
			}, (err) => {
				console.error(err);
			}
		);

		this.userServ.getAllUser().then(
			(res) => {
				this.employes = res;
				for(let i=0; i < this.employes.length; i++) {
					// boucle permettant de retirer tout les users sans profil
					if (this.employes[i].profil == null) {
						this.employes.splice(i, 1);
						break;
					} else {
						continue;
					}
				}
			}, (err) => {
				console.error(err);
			}
		);

		this.profilServ.getAllProfil().then(
			(res) => {
				this.allProfil = res;
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

	onSubmitEntreprise(f: NgForm): void {
		let profilArray = [];

		for (let j = 0; j < this.employes.length; j++) {
			// récupération des valeurs sélectionnées
			if (f.value[this.employes[j].id]) {
				profilArray.push(this.employes[j].profil.id);
			}
		}
		
		this.entrepriseServ.addEntreprises(f.value.nom, 'E-001',f.value.statut, f.value.activite, profilArray).then(
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
		this.entrepriseMod = (ent != null) ? ent : null;
	}

	deleteEnterpise(entrepriseD): void {
		this.entrepriseServ.deleteEntreprises(entrepriseD.id).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	onSubmitModEntreprise(f: NgForm): void {
		console.log(f.value);
		let profilArray = [];

		for (let j = 0; j < this.employes.length; j++) {
			// récupération des valeurs sélectionnées
			if (f.value[this.employes[j].id]) {
				profilArray.push(this.employes[j].profil.id);
			}
		}

		this.entrepriseServ.updateEntreprises(this.entrepriseMod.id, f.value.nom, 'E-001', f.value.statut, f.value.activite, profilArray).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}

	isChecked(userId): boolean {
		return (this.entrepriseMod.utilisateurs.indexOf(userId) >= 0) ? true : false;
	}
	
	isCheckedStatut(statut) {
		return (this.entrepriseMod != null && statut==this.entrepriseMod.statut)?true : false;
	}
}
