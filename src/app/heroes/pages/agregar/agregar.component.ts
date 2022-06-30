import { Component, OnInit } from '@angular/core';
import { switchMap } from "rxjs/operators";
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroeService } from '../../services/heroe.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [`
    img{
      width: 100;
      border-radius: 20px;
    }
  `]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  publishers = [
    {
      id:   'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id:   'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ]

  constructor(private heroeService: HeroeService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) { }


  ngOnInit(): void {

    if (!this.router.url.includes('editar')){
      return;
    }

    this.activatedRoute.params
          .pipe(
            switchMap( ({ id }) => this.heroeService.getHeroePorId(id) ) )
          .subscribe( heroe  => this.heroe = heroe);

  }

  guardar(){

    if(this.heroe.superhero.trim().length === 0 ){
      return
    }

    if (this.heroe.id){
      // Actualizar
      this.heroeService.actualizarHeroe(this.heroe)
        .subscribe(heroe => {
          this.mostrarSnackbar('Registro Actualizado');
        });

    }else{
      // Crear
      this.heroeService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Registro Creado');
        })
    }

  }

  borrar(){

    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      data: this.heroe
    });

    dialog.afterClosed()
      .subscribe( (result) => {
        if (result){
          // Borrar
          this.heroeService.borrarHeroe(this.heroe.id!)
            .subscribe( resp => {
              this.router.navigate(['/heroes']);
            });
        }

      });

  }

  mostrarSnackbar(mensaje: string): void{
    this.snackBar.open(mensaje, 'ok!', {
      duration: 2500
    })
  }

}
