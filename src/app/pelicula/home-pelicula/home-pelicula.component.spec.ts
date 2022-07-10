import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePeliculaComponent } from './home-pelicula.component';

describe('HomePeliculaComponent', () => {
  let component: HomePeliculaComponent;
  let fixture: ComponentFixture<HomePeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePeliculaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
