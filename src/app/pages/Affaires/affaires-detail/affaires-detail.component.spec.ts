import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AffairesDetailComponent } from './affaires-detail.component';

describe('AffairesDetailComponent', () => {
  let component: AffairesDetailComponent;
  let fixture: ComponentFixture<AffairesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AffairesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AffairesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
