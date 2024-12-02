import { AfterContentChecked, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Subject, takeUntil, tap, throwError } from 'rxjs';
import { Pokemon } from '../interface/pokemon';
import { Pagination } from '../interface/pagination';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit, OnDestroy, AfterContentChecked {

  constructor(private pokemonService: PokemonService, private router: Router, readonly route: ActivatedRoute, private changeDetector: ChangeDetectorRef) { }
  
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator
  
  pokemonList$: any[] = []
  totalItems!: any
  pokemonData$: Pokemon[] = []

  length!: number
  pageIndex: number = 0  
  pageSize: number = 30

  isFirstPage!: boolean

  ngOnInit(): void { 
    this.router.navigate([`pokemon/list-by`], { queryParams: { page: `${this.pageIndex + 1}` } })
    this.route.queryParams.subscribe(params => { this.pageIndex = params['page'] - 1 }) 
    this.paginator._intl.itemsPerPageLabel = `Pokemones por página: `  
    this.getPokemonCount() 
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges()    
  }

  //* Los Subject sirven de 'puente' entre los Observables y las Subscripciones
  private readonly onDestroy = new Subject<void>()
  ngOnDestroy(): void {
    this.onDestroy.next()
    this.onDestroy.complete()  
  }

  //* Obtiene la página actual y la pasa como parámetro al URL
  getCurrentPage(page: any) {
    this.router.navigate([`pokemon/list-by`], { queryParams: { page: `${page.pageIndex + 1}` } })
    this.route.queryParams.subscribe(params => { page.pageIndex = params['page'] - 1 }) 
  }

  //* Se obtiene la cantidad total de Pokemones para despues ir renderizando los datos de cada resultado mediante su id
  getPokemonCount() {
    this.pokemonService.getPokemonsCount()
    .pipe(
      takeUntil(this.onDestroy),
      tap((res: Pagination) => {
        this.totalItems = res.count       
        this.getPokemonData(this.totalItems) 
        this.pokemonService.getAllPokemons(this.totalItems)
        .pipe(
          takeUntil(this.onDestroy),
          tap((data: Pagination) => {            
            this.pokemonList$ = data.results
            this.length = this.pokemonList$.length    
          }),
          catchError(error => { return throwError(() => error) }) 
        )
        .subscribe()
      }),
      catchError(error => { return throwError(() => error) })  
    )
    .subscribe()
  }

  //* Se obtienen los datos individuales de cada Pokémon
  async getPokemonIdList(id: number) {
    const res = await fetch(`${environment.url}/${id}`)
    const data = await res.json()
    this.pokemonData$.push(data)

    return data;
  }

  //* Obtiene la lista de todos los Pokemones
  async getPokemonData(total: number) {
    for (let i = 1; i <= total; i++) {
      await this.getPokemonIdList(i)
    }
  }
}