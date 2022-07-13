import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`/peliculas`);
  }

  obtenerPelicula(id: string): Observable<Pelicula> {
    return this.http.get<Pelicula>(`/peliculas/${id}`);
  }

  guardarPelicula(pelicula: Pelicula): Observable<Object> {
    return this.http.post(`/peliculas`, pelicula);
  }
}
