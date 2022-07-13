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
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.currentDate = new Date();

    this.modelDate = new NgbDate(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      this.currentDate.getDay()
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
    console.log(this.newSeenMovieForm.value);
  }

}
