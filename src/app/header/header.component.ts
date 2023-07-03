import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
    <header>      
      <button class="btn btn-light" (click)="redirectTo('pokemonList')">Listar por páginas:</button>
      <a [href]="'https://pokeapi.co/'" target="_blank" title="Sitio web">Angular 'PokéAPI'</a>
      <button class="btn btn-light" (click)="redirectTo('pokedex')">Filtrar por nombre:</button>
    </header>       
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {  

  constructor(private router: Router) {}

  redirectTo(path: string) {  
    this.router.navigate([`${path}`])     
  }
}
