import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonSortComponent } from './create-bon-sort.component';

describe('CreateBonSortComponent', () => {
  let component: CreateBonSortComponent;
  let fixture: ComponentFixture<CreateBonSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBonSortComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
