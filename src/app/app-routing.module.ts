import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonListComponent } from './pages/pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';

const routes: Routes = [
  { path: '', redirectTo: 'pokemon/list-by', pathMatch: 'full' },
  
  { path: 'pokemon/list-by', component: PokemonListComponent },
  { path: 'pokemon/pokedex', component: PokedexComponent },

  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
