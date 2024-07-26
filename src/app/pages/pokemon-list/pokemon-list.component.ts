import { Component, OnDestroy, OnInit } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, debounceTime, Subject, takeUntil, tap, throwError } from 'rxjs';
import { Pokemon } from '../interface/pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy {

  constructor(private pokemonService: PokemonService, private router: Router, readonly route: ActivatedRoute) { }
  
  pokemonList$: any[] = []

  //* Resultados por página
  page: number = 1
  limit: number = 29
  offset: number = 1  

  isFirstPage!: boolean

  ngOnInit(): void { 
    this.router.navigate([`pokemon/list-by`], { queryParams: { page: `${this.page}` } })
    this.route.queryParams.subscribe(params => { this.page = params['page'] })

    this.fetchPokemonsByPage(this.offset, this.limit) 
  }

  //* Los Subject sirven de 'puente' entre los Observables y las Subscripciones
  private readonly onDestroy = new Subject<void>()
  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()  
  }

  /* Obtiene todos los id dentro del rango del limit y offset, en este caso son de 30 por página */
  async fetchPokemonsByPage(offset: number, limit: number) {
    this.pokemonList$ = [] 
    for (let i = offset; i <= offset + limit; i++) {      
      this.fetchPokemonData(i)   
    }
  }    
  
  /* Recibe el rango de 'id' y obtiene los datos de cada uno para posteriormente renderizarlos */
  fetchPokemonData(id: number) {
    this.pokemonList$ = [] 
    //* Inhabilita el botón de 'página anterior' si se encuentra en la página 1
    this.isFirstPage = this.page <= 1 ? true : false

    this.pokemonService.getPokemonsById(id)  
      .pipe(
        debounceTime(500), //* Casi siempre previene que los id estén desordenados
        takeUntil(this.onDestroy),
        tap((res: Pokemon) => {   
          this.pokemonService.getPokemonDataByName(res.name)
            .pipe(              
              takeUntil(this.onDestroy),
              tap((data: Pokemon) => {     
                this.pokemonList$.push(data)           
              })
            )  
            .subscribe()                
        }),
        catchError(error => {        
          return throwError(() => error)
        })      
      )
      .subscribe()   
  } 

  /* Regresa a la página anterior y se actualiza el parámetro */
  prevPage() {
    if(this.offset != 1) {
      this.offset -= 30
      if(this.page !== 1) this.page--
      this.router.navigate([`pokemon/list-by`], { queryParams: { page: `${this.page}` } })
      this.fetchPokemonsByPage(this.offset, this.limit);
    }
  }
  /* Pasa a la siguiente página y se actualiza el parámetro */
  nextPage() {
    this.offset += 30
    this.page++
    this.router.navigate([`pokemon/list-by`], { queryParams: { page: `${this.page}` } })
    this.fetchPokemonsByPage(this.offset, this.limit)
  }  
}