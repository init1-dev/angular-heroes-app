import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] = [];
  heroeSeleccionado: Heroe | undefined;
  flagBuscar: boolean = false;

  subject: Subject<string> = new Subject();

  constructor( private heroesService: HeroesService,               
               private router: Router
  ) {}

  ngOnInit(): void {
    this.subject
      .pipe(debounceTime(500))
      .subscribe( () => {
          this.buscando();
      })
  }

  onKeyUp(): void {
    this.subject.next( this.termino );
  }

  buscando() {
    const termino = this.termino.trim();
    if( termino !== '' ){
      this.heroesService.getSugerencias( termino )
      .subscribe( heroes => {
        this.flagBuscar = true;
        this.heroes = heroes;
      })
    } else {
      this.flagBuscar = false;
    }
  }

  opcionSeleccionada( evento: MatAutocompleteSelectedEvent ) {
    const heroe: Heroe = evento.option.value;
    if( heroe !== undefined ) {
      this.termino = heroe.superhero;
  
      this.heroesService.getHeroe( heroe.id! )
        .subscribe( heroe => {
          this.router.navigate([`/heroes/${ heroe.id }`]);
          // this.heroeSeleccionado = heroe;
        });
    }
  }

}