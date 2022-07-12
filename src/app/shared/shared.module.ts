import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from './go-back/go-back.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    GoBackComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    GoBackComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
