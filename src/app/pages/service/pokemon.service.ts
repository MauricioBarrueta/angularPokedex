import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Pokemon } from '../interface/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private readonly http: HttpClient) { } 

  //* Para obtener la lista de Pokémones que estén dentro del rango asignado
  getPokemonsById(id: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.url}/${id}`) 
  }

  //* Obtiene los datos de cada Pokémon de acuerdo al nombre
  getPokemonDataByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.url}/${name}`)
  }
}
