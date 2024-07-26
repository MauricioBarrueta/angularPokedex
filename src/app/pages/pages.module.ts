import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PokedexComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    PokedexComponent,
    PokemonListComponent
  ]
})
export class PagesModule { }
