import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisDetailComponent } from './fournis-detail.component';

describe('FournisDetailComponent', () => {
  let component: FournisDetailComponent;
  let fixture: ComponentFixture<FournisDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
