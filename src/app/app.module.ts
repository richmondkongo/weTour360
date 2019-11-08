import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GlobalService } from './services/global.service';
import { ProfilService } from './services/profil.service';
import { LoginGuardService } from './services/login-guard.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { MapComponent } from './map/map.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TestServiceComponent } from './test-service/test-service.component';
import { BiensImmobiliersComponent } from './biens-immobiliers/biens-immobiliers.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { CategorieComponent } from './categorie/categorie.component';
import { NumeroComponent } from './profil/numero/numero.component';
import { GroupeEntrepriseComponent } from './groupe-entreprise/groupe-entreprise.component';
import { ProfilComponent } from './profil/profil.component';
import { AdresseComponent } from './profil/adresse/adresse.component';
import { VrComponent } from './vr/vr.component';
import { AframePipeModule } from 'angular-aframe-pipe';
import { FormComponent } from './vr/form/form.component';
import { VisVRComponent } from './vis-vr/vis-vr.component';

@NgModule({
	declarations: [
		AppComponent,
		NavComponent,
		LoginComponent,
		FourOhFourComponent,
		MapComponent,
		ResetPasswordComponent,
		TestServiceComponent,
		BiensImmobiliersComponent,
		EntrepriseComponent,
		CategorieComponent,
		NumeroComponent,
		GroupeEntrepriseComponent,
		ProfilComponent,
		AdresseComponent,
		VrComponent,
		FormComponent,
		VisVRComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule,
		AframePipeModule,
	],
	providers: [
		GlobalService,
		ProfilService,
		LoginGuardService,
	],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
