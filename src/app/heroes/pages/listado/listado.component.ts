import { Component, OnInit } from '@angular/core';
import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
})
export class ListadoComponent implements OnInit {

  constructor(private heroeSerive: HeroeService) { }

  heroes: Heroe[] = [];

  ngOnInit(): void {
    this.heroeSerive.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

}
