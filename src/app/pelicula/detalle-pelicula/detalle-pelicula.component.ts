import { Subscription } from 'rxjs';
import { Pelicula } from './../../models/pelicula';
import { PeliculaService } from './../../services/pelicula.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalle-pelicula',
  templateUrl: './detalle-pelicula.component.html',
  styleUrls: ['./detalle-pelicula.component.scss']
})
export class DetallePeliculaComponent implements OnInit {

  public peliculaEnc: Pelicula;
  public loading = false;

  private peliculaSubscription: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pelicula: PeliculaService
  ) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id'];
    this.loading = true;
    this.peliculaSubscription = this.pelicula.obtenerPelicula(id).subscribe(pelicula => {
      this.peliculaEnc = pelicula;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.peliculaSubscription) {
      this.peliculaSubscription.unsubscribe();
    }
  }

}
