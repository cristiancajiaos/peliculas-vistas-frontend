import { PeliculaService } from './../services/pelicula.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit, OnDestroy {

  peliculas: Pelicula[] = [];

  peliculaSubscription: Subscription;

  constructor(
    private pelicula: PeliculaService
  ) { }

  ngOnInit(): void {
    this.peliculaSubscription = this.pelicula.obtenerPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
    });
  }

  ngOnDestroy(): void {
    if (this.peliculaSubscription) {
      this.peliculaSubscription.unsubscribe();
    }
  }
}
