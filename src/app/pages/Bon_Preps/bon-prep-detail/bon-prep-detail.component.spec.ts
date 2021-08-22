import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonPrepDetailComponent } from './bon-prep-detail.component';

describe('BonPrepDetailComponent', () => {
  let component: BonPrepDetailComponent;
  let fixture: ComponentFixture<BonPrepDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonPrepDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonPrepDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
