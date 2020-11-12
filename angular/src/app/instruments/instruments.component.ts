import { Component, OnInit } from '@angular/core';
import { InstrumentsService } from '../instruments.service';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'instruments',
  templateUrl: './instruments.component.html',
  styleUrls: ['./instruments.component.css']
})

export class InstrumentsComponent implements OnInit {
  private instruments:Object[] = new Array();

  constructor(private instrumentService : InstrumentsService,
              private route : ActivatedRoute) {
   }

  ngOnInit() {
    this.route.params.subscribe((params : Params) => {
      if(params['categorie'] !== undefined){
        this.instrumentService.getInstrumentsWithCategorie(params['categorie']).subscribe(instruments => {
          this.instruments = instruments;}); 
      }else{
        this.instrumentService.getInstruments().subscribe(instruments => {
          this.instruments = instruments;
        });
      } 
    } );
    
  }


}
