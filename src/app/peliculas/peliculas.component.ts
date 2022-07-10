import { PeliculaService } from './../services/pelicula.service';
import { Subscription, Subject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Pelicula } from '../models/pelicula';

@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.scss']
})
export class PeliculasComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  peliculas: Pelicula[] = [];

  peliculaSubscription: Subscription;

  constructor(
    private pelicula: PeliculaService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.peliculaSubscription = this.pelicula.obtenerPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
      this.dtTrigger.next(peliculas);
    });
  }

  ngOnDestroy(): void {
    if (this.peliculaSubscription) {
      this.peliculaSubscription.unsubscribe();
    }

    if (this.dtTrigger) {
      this.dtTrigger.unsubscribe();
    }
  }
}
