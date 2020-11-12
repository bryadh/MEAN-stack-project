import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, BehaviorSubject, Observable } from 'rxjs';



const httpOption ={
  headers: new HttpHeaders({
    "Access-Control-Allow-Methods": "GET,POST",
    "Access-Control-Allow-Headers": "Content-type",
    "Content-Type": "application/json",
    "Authorization": "my-auth-token",
    "Access-Control-Arrow-Origin": "*"
  })
}; 

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  private urlBase : string = "http://localhost:5000/";

  constructor(private http : HttpClient) {}

  ajouterPanier(pan) : Observable<any>{
    console.log(pan);
    return this.http.post<any>(this.urlBase+'panier',pan,httpOption);
  } 

  getPanier(email : string) : Observable<any> {
    return this.http.get(this.urlBase + "paniers/"+email);
   }

   /*validerPanier(user) : Observable<any> {

    return this.http.post(this.urlBase + "panier/validation/",user);
   }*/
   

}
