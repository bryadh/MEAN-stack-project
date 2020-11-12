import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InstrumentsService {
  private urlBase : string = "http://localhost:5000/";
  constructor(private http: HttpClient) {}

  getInstruments() : Observable<any> {
    return this.http.get(this.urlBase + "instruments/*/*/*/*/*");
  }

  getInstrumentsWithName(instrumentName : string) : Observable<any> {
   return this.http.get(this.urlBase + "instruments/*/"+instrumentName+"/*/*/*");
  }

  getInstrumentsWithCategorie(categorie : string) : Observable<any> {
    return this.http.get(this.urlBase + "instruments/"+categorie+"/*/*/*/*");
   }

  getCategories() : Observable<any>{
    return this.http.get(this.urlBase + "types");
  } 
  
}
