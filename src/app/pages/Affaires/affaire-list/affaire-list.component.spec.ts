import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffaireListComponent } from './affaire-list.component';

describe('AffaireListComponent', () => {
  let component: AffaireListComponent;
  let fixture: ComponentFixture<AffaireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffaireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffaireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
