import { Component, OnInit } from '@angular/core';
import { InstrumentsService } from '../instruments.service';
import { AutentificationService } from '../autentification.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  private categories:Object[] = new Array();
  private user : Observable<string>;

  constructor(private instrumentService : InstrumentsService,
              private autentificationService : AutentificationService,
              private router : Router) { 
                this.user = this.autentificationService.getUser(); 
              }

  ngOnInit() {
    this.instrumentService.getCategories().subscribe(instruments => {
      this.categories = instruments;
    });
  }

  produitCategorie(categorie){
    this.router.navigate(['/instruments',categorie]);
  } 

}
