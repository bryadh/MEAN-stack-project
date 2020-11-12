import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

const httpOption ={
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Access-Control-Arrow-Origin": "*"
  })
}; 


@Injectable({
  providedIn: 'root'
})
export class AutentificationService {

  private urlBase : string = "http://localhost:5000/";
  private user : Subject<string> = new BehaviorSubject<string>(undefined);



  constructor(private http: HttpClient) { }

  getUser(){ return this.user; } 

  connect(data : string){ this.user.next(data); } 

  disconnect(){ this.user.next(null); } 

  verificationConnexion(ident) : Observable<any>{
    return this.http.post(this.urlBase+'utilisateurs/connexion',JSON.stringify(ident), httpOption);
  } 

  ajouterUser(user) : Observable<any>{
    console.log("utilisateur "+ user +"ajouté");
    return this.http.post<any>(this.urlBase+'utilisateur/inscription',user,httpOption);
  } 
}
