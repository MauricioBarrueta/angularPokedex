import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-header',
  template: `
    <header class="d-flex">      
      <button class="btn btn-light" (click)="redirectToList(1)">
        <img src="{{imgPath}}card-list.webp" width="35" height="40"> Listar Pokemones
      </button>
      <a class="api-link d-flex" [href]="'https://pokeapi.co/docs/v2#pokemon-section'" target="_blank" title="Sitio web">
        <span>Powered by:</span>
        <img src="{{imgPath}}/pokeapi.png">
      </a>
      <button class="btn btn-light" (click)="redirectToPokedex()">
        <img width="40" height="40" src="https://img.icons8.com/color/48/pokedex.png" alt="pokedex"/> Ver la Pokédex
      </button>
    </header>       
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {  

  constructor(private router: Router) {}

  imgPath: string = environment.imgPath

  //* Para filtrar los Pokémon por nombre
  redirectToPokedex() {  
    this.router.navigate(['pokemon/pokedex'])     
  }

  //* Para mostrar todos los Pokémon a manera de lista
  redirectToList(page: number) {
    this.router.navigate([`pokemon/list-by`], { queryParams: { page: `${page}` } })
  }
}