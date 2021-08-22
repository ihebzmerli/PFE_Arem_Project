import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonSortDetailComponent } from './bon-sort-detail.component';

describe('BonSortDetailComponent', () => {
  let component: BonSortDetailComponent;
  let fixture: ComponentFixture<BonSortDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonSortDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonSortDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
