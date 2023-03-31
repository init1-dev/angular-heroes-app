import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap, tap } from 'rxjs';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss']
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( 
    private activatedRoute: ActivatedRoute, 
    private heroesService: HeroesService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroe( id ) ),
        tap( console.log )
      )
      .subscribe( ( heroe ) => this.heroe = heroe );
  }

  regresar() {
    this.location.back();
  }

  copyClipboard() {
    if(this.heroe.alt_img){
      navigator.clipboard.writeText( this.heroe.alt_img! );
    }
  }

}