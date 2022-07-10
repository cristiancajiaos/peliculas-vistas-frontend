import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeliculaRoutingModule } from './pelicula-routing.module';
import { PeliculaComponent } from './pelicula.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { AgregarPeliculaComponent } from './agregar-pelicula/agregar-pelicula.component';
import { HomePeliculaComponent } from './home-pelicula/home-pelicula.component';


@NgModule({
  declarations: [
    PeliculaComponent,
    DetallePeliculaComponent,
    AgregarPeliculaComponent,
    HomePeliculaComponent
  ],
  imports: [
    CommonModule,
    PeliculaRoutingModule
  ]
})
export class PeliculaModule { }
