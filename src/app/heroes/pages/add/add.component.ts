import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

import { Heroe, Publisher } from '../../interfaces/heroe.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  publishers: any[] = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.None,
    alt_img: 'assets/no-image.png'
  }

  constructor( private HeroesService: HeroesService,
               private activatedRoute: ActivatedRoute,
               private router: Router,
               private snackBar: MatSnackBar,
               public dialog: MatDialog ) { }

  ngOnInit(): void {
    if( !this.router.url.includes('edit') ){
      return;
    }

    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.HeroesService.getHeroe( id ) )
      )
      .subscribe( heroe => this.heroe = heroe )
  }

  guardar() {
    if( this.heroe.superhero.trim().length === 0 ){
      return;
    }

    if( this.heroe.id ) {
      this.HeroesService.editarHeroe( this.heroe )
        .subscribe( heroe => {
          this.heroe = heroe;
          this.mostrarSnackbar( `${ heroe.superhero } actualizado` )
        })
    } else {
      this.HeroesService.agregarHeroe( this.heroe )
        .subscribe( heroe => {
          // ['/heroes'] ó ['/heroes/edit', heroe.id]
          this.heroe = heroe;
          this.mostrarSnackbar( `${ heroe.superhero } agregado` )
          this.router.navigate(['/heroes/edit', heroe.id])
        })
    }
  }

  eliminar() {

    const dialog = this.dialog.open( ConfirmarComponent, {
      width: '250px',
      data: { ...this.heroe }
    })

    dialog.afterClosed()
      .subscribe( resp => {
        if(resp) {
          this.HeroesService.deleteHeroe( this.heroe.id! )
            .subscribe( heroe => {
              this.router.navigate(['/heroes'])
            })
        }
      })

  }

  copyClipboard() {
    if(this.heroe.alt_img){
      navigator.clipboard.writeText( this.heroe.alt_img! );
    }
  }

  mostrarSnackbar( mensaje: string ): void {
    this.snackBar.open( `${mensaje}`, 'OK', {
      duration: 2500
    })
  }

}
