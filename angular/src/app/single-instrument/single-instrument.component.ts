import { Component, OnInit, Input } from '@angular/core';
import { PanierService } from '../panier.service';
import { NgForm } from '@angular/forms';
import { InstrumentsService } from '../instruments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AutentificationService } from '../autentification.service';
import { Observable } from 'rxjs'; 


@Component({
  selector: 'app-single-instrument',
  templateUrl: './single-instrument.component.html',
  styleUrls: ['./single-instrument.component.css']
})
export class SingleInstrumentComponent implements OnInit {

  @Input() name : string;
  @Input() type : string;
  @Input() marque : string;
  @Input() prix : number;
  
  private panier = {"nom":"", "email":""};
  private user : Observable<string>;
  private message : string = "";


  constructor(private instrumentService : InstrumentsService, private route : ActivatedRoute,
    private autentificationService : AutentificationService,
    private panierService : PanierService,
    private router : Router) { 
    this.user = this.autentificationService.getUser(); 
               
   }

  ngOnInit() {
  }

  ajouterPanier(form : NgForm){
    
    this.panier["nom"] = this.name; 
    this.panier["nombre"] = parseInt(form.value["nombre"],10); 
    if(isNaN(this.panier["nombre"])){
      this.panier["nombre"] = 1;
    }
    this.panier["prix"] = this.prix;
    this.panier["valide"] = 0;
    this.user.subscribe(valeur => {
      this.panier["email"] = valeur; 
      });
      
    this.panierService.ajouterPanier(this.panier).subscribe(
      reponse =>{
        this.message = reponse["message"];
        this.router.navigate(['/paniers']);
      } 
    );
  } 

}
