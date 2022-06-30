import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { switchMap } from "rxjs/operators";

import { HeroeService } from '../../services/heroe.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [`
    img {
      width: 100;
      border-radius: 20px;
    }

    mat-card {
      margin-top: 20px;
    }
  `]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor( private activatedRoute: ActivatedRoute,
               private heroeService: HeroeService,
               private router: Router) { }

  ngOnInit(): void {

    this.activatedRoute.params.pipe(
      switchMap( ( { id } ) => this.heroeService.getHeroePorId(id)  )
    ).subscribe( resp => this.heroe = resp);

  }

  regresar(){
    this.router.navigate(['/heroes/listado']);
  }

}
