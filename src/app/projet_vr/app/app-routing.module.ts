import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VisiteComponent } from './visite/visite.component';
import { NotFoundComponent } from './not-found/not-found.component';


const routes: Routes = [
  { path: '', component: VisiteComponent },
  { path: 'visite', component: VisiteComponent },
  { path: 'vr', component: VisiteComponent },
  { path: 'realite-virtuelle', component: VisiteComponent },
  { path: 'not-found', component: NotFoundComponent },
	{ path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
