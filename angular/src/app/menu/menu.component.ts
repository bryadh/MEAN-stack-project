import { Component, OnInit } from '@angular/core';
import { AutentificationService } from '../autentification.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs'; 


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  private user : Observable<string>;

  constructor(private autentificationService : AutentificationService, private router : Router) { 
    this.user = this.autentificationService.getUser();
  }

  ngOnInit() {
    this.router.navigate(['/instruments']);
  }

  deconnexion(){
    this.autentificationService.disconnect();
    this.router.navigate(['/instruments']);
  } 

}
