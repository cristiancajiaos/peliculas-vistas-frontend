import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private baseUrl = 'http://localhost:8085/api/v1';

  constructor(
    private http: HttpClient
  ) { }

  obtenerPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.baseUrl}/peliculas`);
  }

  obtenerPelicula(id: string): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.baseUrl}/peliculas/${id}`);
  }
}
