import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InstrumentsComponent } from './instruments/instruments.component';
import { AutentificationComponent } from './autentification/autentification.component';
import { PanierComponent } from './panier/panier.component'; 
import { CategorieComponent } from './categorie/categorie.component';
import { InscriptionComponent } from './inscription/inscription.component';



const routes: Routes = [
  { path: 'categories', component : CategorieComponent},
  { path: 'instruments', component : InstrumentsComponent},
  { path: 'instruments/:categorie', component : InstrumentsComponent},
  { path: 'autentification', component : AutentificationComponent },
  { path: 'inscription', component : InscriptionComponent },
  { path: 'paniers', component : PanierComponent } 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
