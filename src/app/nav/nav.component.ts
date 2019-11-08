import { LoginGuardService } from './../services/login-guard.service';
import { GlobalService } from './../services/global.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfilService } from '../services/profil.service';
declare var $: any;


@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	user: any = null;
	name: string = null;

	constructor(
		private router: Router,
		private profil: ProfilService,
		private G: GlobalService,
		private logGuard: LoginGuardService,
	) {}

	ngOnInit() {
		this.profil.getOneUser(this.G.getUserId()).then(
			(res) => {
				this.user = res;
				this.name = this.user.first_name + ' ' + this.user.last_name;
				this.profil.getProfilById(this.G.getUserId());
			}, (err) => {
				console.log('nav:', err);
			}
		);

		$(document).ready(function ($) {
			$('.modal').modal();
			$('.datepicker').datepicker();
			$('.sidenav').sidenav();
			$('.rigg').each(function () {
				$(this).click(function () {
					alert('yaah');
				});
			});
			$('.pct').each(function () {
				$(this).overlayScrollbars({ /* your options */ });
			});
		});
	}

	logout() {
		this.logGuard.logout();
		this.router.navigate(['/login']); 
	}

	goToMap() {
		this.router.navigate(['/map']);
	}

	goToEntreprise() {
		this.router.navigate(['/entreprises']);
	}

	goToBiensImmobiliers() {
		this.router.navigate(['/biens-immobiliers']);
	}

	goToCategories() {
		this.router.navigate(['/categories']);
	}

	goToNumber() {
		this.router.navigate(['/number']);
	}

	goToEnterpriseGroup() {
		this.router.navigate(['/groupe-entreprises']);
	}

	goToProfil() {
		this.router.navigate(['/profil']);
	}
}
