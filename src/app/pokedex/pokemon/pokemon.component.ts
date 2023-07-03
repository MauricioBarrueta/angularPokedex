import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  template: `
    <div class="pokedex-input form-group">
      <input class="form-control" type="text" [(ngModel)]="pokemonName" placeholder="Ingresa el nombre del Pokémon:">
      <button class="btn btn-dark" (click)="sendPokeName()">
        <img src="../../../assets/img/pokedexIcon.png" title="Buscar">
      </button>
    </div>
  `,
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {

  @Output() pokeNameEventEmitter = new EventEmitter<string>()
  pokemonName!: string

  sendPokeName() {
    this.pokeNameEventEmitter.emit(this.pokemonName)
  }
}
