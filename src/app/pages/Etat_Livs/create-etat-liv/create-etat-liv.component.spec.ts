import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEtatLivComponent } from './create-etat-liv.component';

describe('CreateEtatLivComponent', () => {
  let component: CreateEtatLivComponent;
  let fixture: ComponentFixture<CreateEtatLivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEtatLivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEtatLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
