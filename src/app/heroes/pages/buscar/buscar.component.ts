import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroeService } from '../../services/heroe.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [`
    img {
      width: 100;
      border-radius: 20px;
    }
  `]
})
export class BuscarComponent implements OnInit {

  termino: string = '';
  heroes: Heroe[] | undefined;
  heroeSeleccionado: Heroe | undefined;

  constructor(private heroeService: HeroeService) { }

  ngOnInit(): void {
  }

  buscando(){


    this.heroeService.getSugerencias(this.termino.trim())
      .subscribe( heroes => {
          this.heroes = heroes;
      });
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent) {

    if (!event.option.value){
      this.heroeSeleccionado = undefined;
      return
    }

      const heroe: Heroe = event.option.value;
      this.heroeService.getHeroePorId(heroe.id!)
      .subscribe( heroe => this.heroeSeleccionado = heroe);
      this.termino = heroe.superhero;

  }

}
