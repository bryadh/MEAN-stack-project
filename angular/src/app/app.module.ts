import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms' 

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstrumentsComponent } from './instruments/instruments.component';
import { HttpClientModule } from '@angular/common/http';
import { InstrumentsService } from './instruments.service';
import { SingleInstrumentComponent } from './single-instrument/single-instrument.component';
import { AutentificationService } from './autentification.service';
import { AutentificationComponent } from './autentification/autentification.component';
import { MenuComponent } from './menu/menu.component';
import { PanierComponent } from './panier/panier.component';
import { CategorieComponent } from './categorie/categorie.component';
import { InscriptionComponent } from './inscription/inscription.component';

@NgModule({
  declarations: [
    AppComponent,
    InstrumentsComponent,
    SingleInstrumentComponent,
    AutentificationComponent,
    MenuComponent,
    PanierComponent,
    CategorieComponent,
    InscriptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [InstrumentsService,
              AutentificationService],
              
  bootstrap: [AppComponent]
})
export class AppModule { }
