import { Component } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent { 

  constructor(private readonly pokeService: PokemonService) {}   

  pokemon: any[] = []
  alertTextValue: string = ''

  getPokemonNameValue(name: string) { 
    this.alertTextValue = ''
    this.pokemon = [] 
    if(!name) {
      this.alertTextValue = 'Escribe el nombre del Pokémon que deseas buscar'
    } else {
      this.pokeService.getPokemonDataByName(name.toLowerCase())
        .pipe(catchError (error => {
          this.alertTextValue = error.status === 404 ? 'Error, este Pokémon no existe' : ''                  
          return throwError(error)
        }))
        .subscribe((res: any) => {
          this.pokemon.push(res)
        })    
    }    
  }
}
