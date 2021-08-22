import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehiculeComponent } from './create-vehicule.component';

describe('CreateVehiculeComponent', () => {
  let component: CreateVehiculeComponent;
  let fixture: ComponentFixture<CreateVehiculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVehiculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
