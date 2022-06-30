import { Component, Input } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe-tarjeta',
  templateUrl: './heroe-tarjeta.component.html',
  styles: [`
  img {
    width: 90%;
    border-radius: 10px;
    margin: 10px;
  }
`]
})
export class HeroeTarjetaComponent  {

  @Input() heroe!: Heroe;

}
