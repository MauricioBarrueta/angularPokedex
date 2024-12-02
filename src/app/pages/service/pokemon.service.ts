import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../interface/pokemon';
import { Pagination, PaginationRes } from '../interface/pagination';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private readonly http: HttpClient) { } 

  //* Para obtener la cantidad total de Pokemones y sus nombres
  getPokemonsCount(): Observable<Pagination> {
    return this.http.get<Pagination>(`${environment.url}`)
  } 

  //* Para obtener los datos individuales de cada Pokémon
  getAllPokemons(limit: number): Observable<Pagination> {
    return this.http.get<Pagination>(`${environment.url}/?limit=${limit}`)
  }

  //* Obtiene los datos de cada Pokémon de acuerdo al nombre
  getPokemonDataByName(name: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${environment.url}/${name}`)
  }
}
