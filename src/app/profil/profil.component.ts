import { AdresseService } from './../services/adresse.service';
import { ProfilService, typeProfil } from './../services/profil.service';
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { NumeroService } from '../services/numero.service';
declare var $: any;

@Component({
	selector: 'app-profil',
	templateUrl: './profil.component.html',
	styleUrls: ['./profil.component.scss']
})

/*
 * l'utilisation de certaines classes pour le collapse fait apparaître des avertissements dans la console, 
 * mais cela n'empêche pas l'application de fonctionner comme il se doit.
 */


export class ProfilComponent implements OnInit {
	userForm: FormGroup;
	users: any = null;
	userMod: any = null;
	action: number = 1; // partie de du component à afficher 1 pour la liste, 2 pour modifier un bien, 3 pour ajouter un nouveau bien
	collapseTab: boolean[] = []; // permet de savoir si le collapse de chaque groupe est ouvert ou pas

	constructor(
		private formBuilder: FormBuilder,
		private adresseServ: AdresseService,
		private numeroServ: NumeroService,
		private profilServ: ProfilService,
		private G: GlobalService,
	) { }

	ngOnInit() {

		// action du premier chargement
		this.action = 1;

		this.profilServ.getAllUser().then(
			(res) => {
				this.users = res;
				// console.log(this.users);
				for (let j = 0; j < this.users.length; j++) {
					this.collapseTab.push(false); // on ajoute un nouvaux collapse ans le tableau qui aura pour valeur false 
				}
			}, (err) => {
				console.error(err);
			}
		);


		$(document).ready(function () {
			// pour le bouton flottant
			$('.fixed-action-btn').floatingActionButton({
				'direction': 'top',
				'hoverEnabled': false,
			});
		});

		this.initForm();
	}

	initForm(user=null) {
		if (user == null) {
			this.userForm = this.formBuilder.group({
				pseudo: ['', Validators.required],
				nom: ['', Validators.required],
				prenoms: ['', Validators.required],
				mail: ['', [Validators.required, Validators.email]],
				pays: this.formBuilder.array(['']),
				ville: this.formBuilder.array(['']),
				commune: this.formBuilder.array(['']),
				quartier: this.formBuilder.array(['']),
				is_staff: false,
				numero: this.formBuilder.array([''])
			});
		} else {
			var paysArray = [], villeArray = [], communeArray = [], quartierArray = [], numArray = [];
			for (const i of user.profil.adresses) {
				paysArray.push(i.pays);
				communeArray.push(i.commune);
				villeArray.push(i.ville);
				quartierArray.push(i.quartier);
			}

			for (const j of user.profil.numeros) {
				numArray.push(j.numero);
			}

			this.userForm = this.formBuilder.group({
				pseudo: [user.username, Validators.required],
				nom: [user.last_name, Validators.required],
				prenoms: [user.first_name, Validators.required],
				mail: [user.email, [Validators.required, Validators.email]],
				pays: this.formBuilder.array(paysArray),
				ville: this.formBuilder.array(villeArray),
				commune: this.formBuilder.array(communeArray),
				quartier: this.formBuilder.array(quartierArray),
				is_staff: user.is_staff,
				numero: this.formBuilder.array(numArray)
			});
		}
			
	}

	getNumero(): FormArray {
		return this.userForm.get('numero') as FormArray;
	}

	getPays(): FormArray {
		return this.userForm.get('pays') as FormArray;
	}

	getVille(): FormArray {
		return this.userForm.get('ville') as FormArray;
	}

	getCommune(): FormArray {
		return this.userForm.get('commune') as FormArray;
	}

	getQuartier(): FormArray {
		return this.userForm.get('quartier') as FormArray;
	}

	onAddNumero() {
		const newNumeroControl = this.formBuilder.control(null, Validators.required);
		this.getNumero().push(newNumeroControl);
	}

	onAddAdresse() {
		const newPaysControl = this.formBuilder.control('', Validators.required);
		this.getPays().push(newPaysControl);

		const newVilleControl = this.formBuilder.control('', Validators.required);
		this.getVille().push(newVilleControl);
		
		const newCommuneControl = this.formBuilder.control('');
		this.getCommune().push(newCommuneControl);
		
		const newQuartierControl = this.formBuilder.control('');
		this.getQuartier().push(newQuartierControl);
	}

	openCollapse(group): void {
		this.collapseTab[this.users.indexOf(group)] = !this.collapseTab[this.users.indexOf(group)];
	}

	onSubmitUser(): void {
		const f = this.userForm.value;
		let reS: any = null;
		let prof: typeProfil;
		let isStaff = (f['is_staff'] == true) ? true : false;
		if(this.userMod == null) {
			prof = { 'matricule': 'test', 'adresses': null, 'numeros': null, 'photo': null }
			this.profilServ.addUser(f['pseudo'], f['nom'], f['prenoms'], f['mail'], prof, isStaff).then(
				(res) => {
					reS = res;
					if (reS.profil.id != null)
						for (let i = 0; i < f['numero'].length; i++) {
							if(f['numero'][i].length > 0)
								this.numeroServ.addNumero(reS.profil.id, null, null, f['numero'][i]).then(
									(res1) => {

									}, (err1) => {
										console.error(err1);
									}
								);
						}
						for (let j = 0; j < f['pays'].length; j++) 
							this.adresseServ.addAdresse(reS.profil.id, null, null, f['pays'][j], f['ville'][j], f['commune'][j], f['quartier'][j], null).then(
								(res2) => {
									// this.ngOnInit();
								}, (err2) => {
									console.error(err2);
								}
							);
				}, (err) => {
					console.error(err);
				}
			);
		} else {
			console.log(f);
			prof = this.userMod.profil;
			this.profilServ.updateUser(this.userMod.id, f['pseudo'], f['nom'], f['prenoms'], f['mail'], prof, isStaff).then(
				(res) => { 
					reS = res;
					if (reS.profil.id != null)
						for (let i = 0; i < f['numero'].length; i++) {
							if(f['numero'][i].length > 0)
								this.numeroServ.updateNumero(this.userMod.profil.numeros[i].id, reS.profil.id, null, null, f['numero'][i]).then(
									(res1) => {

									}, (err1) => {
										console.error(err1);
									}
								);
						}
						for (let j = 0; j < f['pays'].length; j++) {
							this.adresseServ.updateAdresse(this.userMod.profil.adresses[j].id, reS.profil.id, null, null, f['pays'][j], f['ville'][j], f['commune'][j], f['quartier'][j], null).then(
								(res2) => {
								}, (err2) => {
									console.error(err2);
								}
							);
						}
					this.ngOnInit();
				}, (err) => {
					console.error(err);
				}
			);
		}

	}

	viewPart(p: number, ent: any = null): void {
		// permet switcher entre la liste des biens(1), la modification d'un bien(2) et l'insertion(3)
		this.action = p;
		if (p == 1) {
			this.ngOnInit();
		}
		this.userMod = (ent != null) ? ent : null;
		if (this.userMod != null) {
			this.initForm(this.userMod);
		}
	}

	deleteUser(user) {
		this.profilServ.deleteUser(user.id).then(
			(res) => {
				this.ngOnInit();
			}, (err) => {
				console.error(err);
			}
		);
	}
}
