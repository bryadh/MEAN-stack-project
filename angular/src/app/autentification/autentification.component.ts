import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgForm } from '@angular/forms';
import { AutentificationService } from '../autentification.service';

@Component({
  selector: 'app-autentification',
  templateUrl: './autentification.component.html',
  styleUrls: ['./autentification.component.css']
})
export class AutentificationComponent implements OnInit {

  private utilisateur = {"email" : "", "password" : ""};
  private message : string = "";

  constructor(private autentificationService : AutentificationService, private router : Router ) { }

  ngOnInit() {
  }

  onSubmit(form : NgForm){
      this.utilisateur['email'] = form.value["email"]; 
      this.utilisateur['password'] = form.value["password"]; 
      
      this.autentificationService.verificationConnexion(this.utilisateur).subscribe(
        reponse =>{
          this.message = reponse['message'];
          if(reponse['resultat']){
            this.autentificationService.connect(this.utilisateur['email']);
            this.router.navigate(['/instruments']);
          } else {
          setTimeout( () => { this.router.navigate(['/autentification']); },1000 ); }
        } 
      );
  } 

}
