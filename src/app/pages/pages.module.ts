import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PokedexComponent } from './pokedex/pokedex.component';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { RouterModule } from '@angular/router';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  declarations: [
    PokedexComponent,
    PokemonListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatPaginatorModule
  ],
  exports: [
    RouterModule,
    FormsModule,
    PokedexComponent,
    PokemonListComponent
  ]
})
export class PagesModule { }
