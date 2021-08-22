import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBonSortComponent } from './update-bon-sort.component';

describe('UpdateBonSortComponent', () => {
  let component: UpdateBonSortComponent;
  let fixture: ComponentFixture<UpdateBonSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBonSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBonSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
