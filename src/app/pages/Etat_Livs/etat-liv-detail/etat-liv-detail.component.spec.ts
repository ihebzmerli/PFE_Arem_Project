import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatLivDetailComponent } from './etat-liv-detail.component';

describe('EtatLivDetailComponent', () => {
  let component: EtatLivDetailComponent;
  let fixture: ComponentFixture<EtatLivDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatLivDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatLivDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
