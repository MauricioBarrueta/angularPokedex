import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Pokemon } from '../interface/pokemon';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss']
})
export class PokedexComponent implements OnDestroy { 

  constructor(private readonly pokeService: PokemonService, private router: Router) {}   
    
  pokemon$: any[] = []
  pokemonName!: string

  alertTextValue: string = ''
  imgPath: string = `${environment.imgPath}`

  private readonly onDestroy = new Subject<void>()
  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete() 
  }

  getPokemonNameValue(name: string) { 
    this.alertTextValue = ''
    this.pokemon$ = [] 
    if(!name) {
      this.alertTextValue = 'Primero debes ingresar el nombre del Pokémon que estás buscando...'
    } else {
      this.router.navigate([`pokemon/pokedex`], { queryParams: { pokemon: `${this.pokemonName}` } })
      this.pokeService.getPokemonDataByName(name.toLowerCase())
        .pipe(
          takeUntil(this.onDestroy),
          tap((res: Pokemon) => {
            this.pokemon$.push(res)
          }),
          catchError(error => {    
            this.alertTextValue = error.status === 404 ? 'No se encontró ningún Pokémon con este nombre, ingresa uno diferente e inténtalo de nuevo...' : ''                  
            return throwError(() => error)
          }) 
        )
        .subscribe()    
    }    
  }  
}