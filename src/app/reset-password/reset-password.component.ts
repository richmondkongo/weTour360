import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as jwt_decode from 'jwt-decode';

import { LoginGuardService } from '../services/login-guard.service';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: [
		'../../assets/style.scss',
		'./reset-password.component.scss'
	]
}) 

export class ResetPasswordComponent implements OnInit {
	msgMail: { 'type': number, 'msg': string };
	msgMdp: { 'type': number, 'msg': string };
	// variables affichant un message à l'utilisateur
	mailLen: number = 6; mdpLen: number = 5;
	// longueur minimal des chaines de caractères que l'user doit entrer
	mailForm: boolean;
	// booleen disant que l'utilisateur veut se logguer ou aller sur le formulaire de mot de passe
	tokenToReset: any = null;
	first: boolean;
	constructor(
		private G: GlobalService,
		private router: Router,
		private activateRoute: ActivatedRoute,
		private loginGuard: LoginGuardService,
	) {
		this.msgMail = { 'type': 2, 'msg': null };
		this.msgMdp = { 'type': 2, 'msg': null };
	}

	ngOnInit() {
		if (this.activateRoute.snapshot.params['token'] != null) {
			// on vérifie si le user ne vient modifer son mot de passe avec un token(ie: déjà passé dans sa boite mail) si oui alors
			// on active le formulaire où il doit retoucher le mot de passe en donnant false à mailForm et en récupérant le token.
			this.tokenToReset = this.activateRoute.snapshot.params['token'];
			this.mailForm = false;
		} else {
			this.mailForm = true;
		}

		if (localStorage.token != null) {
			// on vérifie que l'utilisateur n'est pas déjà connecté sinon on le redirige vers sa map
			this.loginGuard.logout();
		}

		this.first = true; // pour dire que l'utilisateur vient d'arriver sur la page et donc on ne peut afficher de message
	}

	getColorMail() {
		return (this.msgMail.type == 1) ? 'green' : 'red';
	}

	getColorMdp() {
		return (this.msgMdp.type == 1) ? 'green' : 'red';
	}

	getOpacityOfSubmitButtonMail(opacity: boolean, f: NgForm): string {
		// donne une opacité faible au bouton d'envoie du formulaire si les valeurs entrées ne nous correspondent pas.
		// opacity vient du formulaire(f.invalid) qui vérifie qu'on a bien respecté les conditions par defaut telle que remplir un champ obligatoire, la longueur...
		let faible: string = '0.5';
		let forte: string = '1';
		return (opacity && this.validMail(f)) ? forte : faible;
	}

	getOpacityOfSubmitButtonMdp(opacity: boolean, f: NgForm): string {
		// donne une opacité faible au bouton d'envoie du formulaire si les valeurs entrées ne nous correspondent pas.
		// opacity vient du formulaire(f.invalid) qui vérifie qu'on a bien respecté les conditions par defaut telle que remplir un champ obligatoire, la longueur...
		let faible: string = '0.5';
		let forte: string = '1';
		return (opacity && this.validMdp(f)) ? forte : faible;
	}

	firstVisit() {
		// donne la valeur false à la variable first qui représente le fait que l'user à arrive la page de navigation au début
		this.first = false;
	}

	validMail(f: NgForm): boolean {
		let regex = /^[a-zA-Z0-9\-_\.]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/;

		if (!regex.test(f.value.mail) && !this.first) {
			//si le mail est juste et le user ne vient pas d'arriver la page pour la première fois
			this.msgMail.type = 2;
			this.msgMail.msg = (f.value.mail.length >= 5) ? 'Le format de ce mail est incorrect.' : null;
		} else if (regex.test(f.value.mail)) {
			return true;
		}
		return false;
	}

	validMdp(f: NgForm): boolean {
		if (f.value.mdp != f.value.confMdp && !this.first) {
			this.msgMdp = { 'type': 2, 'msg': 'les mots de passe ne concordent pas.' };
		} else if (f.value.mdp == f.value.confMdp) {
			// this.msgMdp = { 'type': 2, 'msg': '' };
			/* 
			 * ATTENTION
			 * lorsque les mots de passes concordent il n' y pas de suppression du msg
			 */
			return true;
		}
		return false;
	}

	goToLogin() {
		this.router.navigate(['/login']);
	}

	onSubmitResetMail(f: NgForm) {
		if (this.validMail(f)) {
		this.loginGuard.login(this.G.postman.username, this.G.postman.password).then(
			(resLog) => {
				this.loginGuard.sendMailToResetMdp(f.value.mail).then(
					(res) => {
						if (res) {
							this.msgMail =  {'type':null, 'msg':null};
							this.msgMail = { 'type': 1, 'msg': 'Un lien de réinitialisation de votre mot de passe vous a été envoyé, il expirera dans 25 minutes.' };
						} else {
							this.msgMail =  {'type':null, 'msg':null};
							this.msgMail = { 'type': 2, 'msg': 'Le mail que vous avez entré est inexistant dans notre base de donnée.' };
						}
					}, (err) => {
						console.log(err);
						this.msgMail = { 'type': 2, 'msg': 'Le mail que vous avez entré est inexistant dans notre base de donnée.' };
						console.log('msg reset1:', this.msgMail.msg);
					}
				);
				this.loginGuard.logout();
			}, (errLog) => {
				console.error('erreur de connection avec avec postman: ', errLog);
			}
		);
		
			
		} else {
			this.msgMail = { 'type': 1, 'msg': 'Remplissez bien le champ' };
		}
	}

	onSubmitResetMdp(f: NgForm) {
		if (this.validMdp(f)) {
			this.loginGuard.login(this.G.postman.username, this.G.postman.password).then(
			(resLog) => {
				this.loginGuard.resetMdp(this.tokenToReset, f.value.mdp).then(
					(res) => {
						let tkDecode = jwt_decode(this.tokenToReset);// tokenToReset provient de l'url envoyé par mail par le biais de l'api
						// c'est ici qu'on redirige l'user vers la page d'accueil
						this.loginGuard.login(tkDecode.email, f.value.mdp).then(
							(resp) => {
								console.log('reponse de resp:', resp);
								this.router.navigate(['/map']);
							}, (errP) => {
								console.error('errP=', errP);
								this.router.navigate(['/login']);
							}
						);
					}, (err) => {
						console.log('reset-password:', err);
						this.msgMdp = {'type':2, 'msg':'Réessayer s\'il vous plait' };
					}
				)
				this.loginGuard.logout();
			}, (errLog) => {
				console.error('erreur de connection avec avec postman: ', errLog);
			}
		);

			
		} else {
			this.msgMdp = {'type':2, 'msg':'Remplissez bien le champ'};
		}
		this.loginGuard.logout();
	}
}
