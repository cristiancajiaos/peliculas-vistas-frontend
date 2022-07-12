import { Router } from '@angular/router';
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

  public loading = false;

  public dtOptions: DataTables.Settings = {};
  public dtTrigger: Subject<any> = new Subject<any>();

  public peliculas: Pelicula[] = [];

  private peliculaSubscription: Subscription;

  constructor(
    private pelicula: PeliculaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

    this.loading = true;
    this.obtenerPeliculas();
  }

  private obtenerPeliculas(): void {
    this.peliculaSubscription = this.pelicula.obtenerPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
      this.dtTrigger.next(peliculas);
    }, error => {
    }, () => {
      this.loading = false;
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

  detailMovie(id: number): void {
    this.router.navigate(['/pelicula', id.toString()]);
  }
}
