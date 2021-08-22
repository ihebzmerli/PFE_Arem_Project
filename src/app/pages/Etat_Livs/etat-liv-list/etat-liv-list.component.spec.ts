import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtatLivListComponent } from './etat-liv-list.component';

describe('EtatLivListComponent', () => {
  let component: EtatLivListComponent;
  let fixture: ComponentFixture<EtatLivListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtatLivListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtatLivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
