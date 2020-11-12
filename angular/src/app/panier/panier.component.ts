import { Component, OnInit } from '@angular/core';
import { PanierService } from '../panier.service';
import { AutentificationService } from '../autentification.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  private paniers:Object[] = new Array();
  private user : Observable<string>;
  private email : string = "";
  private prix:Object[] = new Array();
  private total : number = 0;
  
 

  constructor(private panierService : PanierService,
             private autentificationService : AutentificationService
             ) { 
    this.user = this.autentificationService.getUser();
    
  }

  ngOnInit() {
    
    this.user.subscribe(valeur => {
      this.email = valeur; 
      });
    this.panierService.getPanier(this.email).subscribe(
      panier =>{
        this.paniers = panier;
      } 
    );
  }

  /*validerPanier(){
    this.panierService.ajouterPanier(this.email).subscribe();
  }  */


  getPrixTotal():number{
    this.total = 0;
    for(var instrument of this.paniers){
      this.total += (instrument['prix'] * instrument['nombre']);
    } 
    return this.total;
  } 

}
