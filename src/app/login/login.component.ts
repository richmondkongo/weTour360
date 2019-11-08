import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ProfilService } from '../services/profil.service';
import { LoginGuardService } from '../services/login-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
		'../../assets/style.scss',
		'./login.component.scss'
	]
})

export class LoginComponent implements OnInit {
  	msgLogin: string = null;
  	// variable affichant un message à l'utilisateur
	idfLen: number = 3; mdpLen: number = 5;
	// longueur minimal des chaines de caractères que l'user doit entrer
	tokenToReset: any = null;

  	constructor(
		private G: GlobalService,
		private router: Router,
		private loginGuard: LoginGuardService
	) { }

  	ngOnInit() {
		if (localStorage.token != null && sessionStorage.msgLogin == null) {
      	// on vérifie que l'utilisateur n'est pas déjà connecté sinon on le redirige vers sa map
      	this.router.navigate(['/map']);
    	} else if (sessionStorage.msgLogin != null) {
			this.msgLogin = sessionStorage.msgLogin;
			sessionStorage.removeItem('msgLogin');
		}
	}
	  
  	onSubmitLogin(f: NgForm) {
		 // vérifie si tout est OK pour permettre soit de ressaisir ses identifiants ou d'aller à la page suivante.  
    	if (this.validInput(f)) {
			this.loginGuard.login(f.value.idf, f.value.mdp).then(
				(res) => {
					// console.log("login component zo:", data);
					this.msgLogin = null;
					this.router.navigate(['/map']);
				}, (err) => { 
					console.log("login component erreur:", err);
					this.msgLogin = 'Mot de passe ou identifiant incorrecte.';
				}
			);  
    	} else {
			this.msgLogin = 'Renseigner bien les deux champs.'
    	}
  	}

  	getOpacityOfSubmitButton(opacity:boolean): string {
    	// donne une opacité faible au bouton d'envoie du formulaire si les valeurs entrées ne nous correspondent pas.
    	// opacity vient du formulaire(f.invalid) qui vérifie qu'on a bien respecté les conditions par defaut telle que remplir un champ obligatoire, la longueur...
		let faible: string = '0.5';
		let forte: string = '1';
		return (opacity)?faible:forte;
  	}

  	validInput(form: NgForm): boolean {
    	// au cas où on voudrait effectuer des vérifications poussées sur le champ identifiant
		if (form.value.idf.length >= this.idfLen && form.value.mdp.length >= this.mdpLen) {
			// tout les champs sont ok
			this.msgLogin = null;
			return true;
		} else {
			// problème sur l'un des champs, il y a une raison si nous avons utiliser 2 si au lieu d'un si et d'un sinon
			if (form.value.mdp.length < this.mdpLen) {
				this.msgLogin = 'le mot de passe doit avoir ' + this.mdpLen + ' caractères minimum.';
			}
			if (form.value.idf.length < this.idfLen) {
				this.msgLogin = 'l\'identifiant doit avoir ' + this.idfLen + ' caractères minimum.';
			} 
			return false;
		}
	}

	goToResetPassword() {
		this.router.navigate(['/reset-password']);
	}
	  
}
