import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroe.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private apiEndpoint: string = environment.apiEndpoint;

  constructor( private http: HttpClient ) { }

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>( `${this.apiEndpoint}/heroes` );
  }

  getHeroe( heroeId: string ): Observable<Heroe> {
    return this.http.get<Heroe>( `${this.apiEndpoint}/heroes/${ heroeId }` );
  }

  deleteHeroe( heroeId: string ): Observable<Heroe> {
    return this.http.delete<Heroe>( `${this.apiEndpoint}/heroes/${ heroeId }` );
  }

  getSugerencias( termino: string, limit: number = 6 ): Observable<Heroe[]> {
    return this.http.get<Heroe[]>( `${this.apiEndpoint}/heroes?q=${ termino }&_limit=${ limit }` );
  }

  agregarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.post<Heroe>(`${ this.apiEndpoint }/heroes`, heroe);
  }

  editarHeroe( heroe: Heroe ): Observable<Heroe> {
    return this.http.put<Heroe>(`${ this.apiEndpoint }/heroes/${ heroe.id }`, heroe);
  }

}
