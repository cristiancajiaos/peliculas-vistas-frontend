import { HomePeliculaComponent } from './home-pelicula/home-pelicula.component';
import { DetallePeliculaComponent } from './detalle-pelicula/detalle-pelicula.component';
import { AgregarPeliculaComponent } from './agregar-pelicula/agregar-pelicula.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: HomePeliculaComponent},
  { path: 'agregar', component: AgregarPeliculaComponent },
  { path: ':id', component: DetallePeliculaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeliculaRoutingModule { }
