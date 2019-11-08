import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuardService } from './services/login-guard.service';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { MapComponent } from './map/map.component';
import { BiensImmobiliersComponent } from './biens-immobiliers/biens-immobiliers.component';
import { TestServiceComponent } from './test-service/test-service.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { GroupeEntrepriseComponent } from './groupe-entreprise/groupe-entreprise.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NumeroComponent } from './profil/numero/numero.component';
import { ProfilComponent } from './profil/profil.component';
import { VisVRComponent} from './vis-vr/vis-vr.component';
import { FormComponent } from './vr/form/form.component';

const routes: Routes = [
	{ path: '', component: LoginComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 't', component: TestServiceComponent }, // pour les test
	{ path: 'reset-password', component: ResetPasswordComponent },
	{ path: 'reset_password/:token', component: ResetPasswordComponent },
	{ path: 'map', canActivate: [LoginGuardService], component: MapComponent },
	{ path: 'maps', canActivate: [LoginGuardService], component: MapComponent },
	{ path: 'ent', canActivate: [LoginGuardService], component: EntrepriseComponent },
	{ path: 'entreprise', canActivate: [LoginGuardService], component: EntrepriseComponent },
	{ path: 'enterprise', canActivate: [LoginGuardService], component: EntrepriseComponent },
	{ path: 'entreprises', canActivate: [LoginGuardService], component: EntrepriseComponent },
	{ path: 'enterprise-group', canActivate: [LoginGuardService], component: EntrepriseComponent },
	{ path: 'groupe-entreprise', canActivate: [LoginGuardService], component: EntrepriseComponent },
	{ path: 'groupe-entreprises', canActivate: [LoginGuardService], component: GroupeEntrepriseComponent },
	{ path: 'cat', canActivate: [LoginGuardService], component: CategorieComponent },
	{ path: 'categorie', canActivate: [LoginGuardService], component: CategorieComponent },
	{ path: 'categories', canActivate: [LoginGuardService], component: CategorieComponent },
	{ path: 'bm', canActivate: [LoginGuardService], component: BiensImmobiliersComponent },
	{ path: 'biens-immobiliers', canActivate: [LoginGuardService], component: BiensImmobiliersComponent },
	{ path: 'tvr', component: VisVRComponent},
	{ path: 'vr', canActivate: [LoginGuardService], component: VisVRComponent},
	{ path: 'visit-virtuelle', canActivate: [LoginGuardService], component: VisVRComponent},
	{ path: 'realitee-virtuelle', canActivate: [LoginGuardService], component: VisVRComponent},
	{ path: 'virtual-reality', canActivate: [LoginGuardService], component: VisVRComponent},
		{ path: 'update-vr', canActivate: [LoginGuardService], component: FormComponent },
		{ path: 'insert-vr', canActivate: [LoginGuardService], component: FormComponent },
		{ path: 'new-vr', canActivate: [LoginGuardService], component: FormComponent },

	{ path: 'profil', canActivate: [LoginGuardService], component: ProfilComponent },
	{ path: 'num', canActivate: [LoginGuardService], component: NumeroComponent },
	{ path: 'number', canActivate: [LoginGuardService], component: NumeroComponent },
	{ path: 'numero', canActivate: [LoginGuardService], component: NumeroComponent },

	{ path: 'not-found', component: FourOhFourComponent },
	{ path: '**', redirectTo: 'not-found' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})

export class AppRoutingModule { }