import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonSortListComponent } from './bon-sort-list.component';

describe('BonSortListComponent', () => {
  let component: BonSortListComponent;
  let fixture: ComponentFixture<BonSortListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonSortListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonSortListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
