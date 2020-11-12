import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { AutentificationService } from '../autentification.service';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {
  private message : string = "";
  private utilisateur = {"email" : ""};

  constructor(private autentificationService : AutentificationService, private router : Router) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
    this.utilisateur['email'] = form.value["email"]; 
    
    
    this.autentificationService.verificationConnexion(this.utilisateur).subscribe(
      reponse =>{
        console.log(reponse['resultat']);
        if(!reponse['resultat']){
          this.utilisateur['password'] = form.value["password"]; 
          this.utilisateur['nom'] = form.value["nom"]; 
          this.utilisateur['prenom'] = form.value["prenom"]; 
          this.message = "inscrit avec succé";
          this.autentificationService.ajouterUser(this.utilisateur).subscribe();
          this.router.navigate(['/autentification']);
        } else {
        this.message = "Email déja éxistant"
        setTimeout( () => { this.router.navigate(['/inscription']); },1000 ); }
      } 
    );
} 

}
