import { PeliculaService } from './../../services/pelicula.service';
import { Pelicula } from './../../models/pelicula';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-agregar-pelicula',
  templateUrl: './agregar-pelicula.component.html',
  styleUrls: ['./agregar-pelicula.component.scss']
})
export class AgregarPeliculaComponent implements OnInit {

  public newSeenMovieForm: FormGroup;
  public currentDate: Date;
  public modelDate: NgbDate;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private peliculaService: PeliculaService
  ) { }

  ngOnInit(): void {
    this.currentDate = new Date();

    this.modelDate = new NgbDate(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      this.currentDate.getDate()
    );

    this.newSeenMovieForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      doubleTitle: new FormControl(false),
      originalTitle: new FormControl('', [Validators.required]),
      year: new FormControl('', [Validators.required]),
      dateSeen: new FormControl(this.modelDate, [Validators.required]),
      movieLanguage: new FormControl('', [Validators.required]),
      seenOn: new FormControl('', [Validators.required])
    });
  }

  public isInvalidField(formField: string): boolean {
    let formControlField: AbstractControl = this.newSeenMovieForm.controls[formField];
    return (formControlField.touched && formControlField.invalid);
  }

  public showRequiredText(formField: string): boolean {
    let formControlField: AbstractControl = this.newSeenMovieForm.controls[formField];
    return (formControlField.touched && formControlField.errors != null && formControlField.errors['required']);
  }

  public setSingleOrDoubleTitle(event: Event) {
    const doubleTitle = this.newSeenMovieForm.controls['doubleTitle'].value;
    const titleValue = this.newSeenMovieForm.controls['title'].value;
    this.newSeenMovieForm.controls['originalTitle'].setValue(doubleTitle ? titleValue : '');
  }

  public isDoubleTitle(): boolean {
    if (this.newSeenMovieForm.controls['title'].value == null) {
      return false;
    }

    const titleValue: string = this.newSeenMovieForm.controls['title'].value;
    return ((titleValue.length > 0) && this.newSeenMovieForm.controls['doubleTitle'].value);
  }

  public cleanForm(): void {
    this.newSeenMovieForm.reset();
    this.newSeenMovieForm.controls['dateSeen'].setValue(this.modelDate);
  }

  public onSubmit(): void {
    const formValue = this.newSeenMovieForm.value;

    let pelicula = new Pelicula();
    pelicula.title = formValue['title'];
    pelicula.originalTitle = formValue['originalTitle'];
    pelicula.year = parseInt(formValue['year'], 10);
    pelicula.dateSeen = this.formatDate(formValue['dateSeen']);
    pelicula.language = formValue['movieLanguage'];
    pelicula.seenOn = formValue['seenOn'];

    this.peliculaService.guardarPelicula(pelicula).subscribe((dato: any) => {
      this.irAListaPeliculas();
    });
  }

  public irAListaPeliculas(): void {
    this.router.navigate(['/peliculas']);
  }

  public formatDate(date: NgbDate): string {
    return `${date.year}-${this.twoDigits(date.month)}-${this.twoDigits(date.day)}`;
  }

  public twoDigits(num: number): string {
    return ((num >= 10) ? num.toString() : '0'.concat(num.toString()));
  }
}
