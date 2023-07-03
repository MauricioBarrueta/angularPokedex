import { Component, ViewContainerRef, Input, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../service/pokemon.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  pokemons: any[] = []   
  limit: number = 19
  offset: number = 1  

  ngOnInit(): void { 
    this.fetchPokemonsByPage(this.offset, this.limit) 
  }

  prevPage() {
    if(this.offset != 1) {
      this.offset -= 20;
      this.pokemons = []
      this.fetchPokemonsByPage(this.offset, this.limit);
    }
  }
  nextPage() {
    this.offset += 20;
    this.pokemons = []
    this.fetchPokemonsByPage(this.offset, this.limit)
  }  

  /* Obtiene todos los id dentro del rango del limit y offset, en este caso son de 20 por página */
  fetchPokemonsByPage(offset: number, limit: number) {
    for (let i = offset; i <= offset + limit; i++) {
      this.fetchPokemonData(i);
    }
  }
  
  /* Recibe los id y obtiene los datos de cada uno para renderizarlos en el html */
  fetchPokemonData(id: number) {
    this.pokemonService.getPokemonsById(id)         
      .subscribe((res: any) => {        
        this.pokemonService.getPokemonDataByName(res.name)
          .subscribe((data: any) => {
            this.pokemons.push(data) /* Se inyectan los datos obtenidos al array */
          })      
      })    
  }  
}