import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private readonly http: HttpClient) { }

  /* Para obtener los id dentro del rango especificado con limit y offset */
  getPokemonsById(id: number) {
    return this.http.get(`${environment.url}/${id}`)
  }  

  /* Obtiene los datos de cada Pokémon de acuerdo al nombre */
  getPokemonDataByName(name: string) {
    return this.http.get(`${environment.url}/${name}`)
  }
}