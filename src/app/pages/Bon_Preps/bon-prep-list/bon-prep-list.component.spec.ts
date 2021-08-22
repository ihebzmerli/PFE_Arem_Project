import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonPrepListComponent } from './bon-prep-list.component';

describe('BonPrepListComponent', () => {
  let component: BonPrepListComponent;
  let fixture: ComponentFixture<BonPrepListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonPrepListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonPrepListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
