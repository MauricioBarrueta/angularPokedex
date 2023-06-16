import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header>
      <a [href]="'https://pokeapi.co/'" target="_blank" title="Sitio web">Angular 'PokéAPI'</a>
    </header>
  `,
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {  

}
