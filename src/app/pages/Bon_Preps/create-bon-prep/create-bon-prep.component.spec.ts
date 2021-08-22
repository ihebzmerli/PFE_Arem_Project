import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonPrepComponent } from './create-bon-prep.component';

describe('CreateBonPrepComponent', () => {
  let component: CreateBonPrepComponent;
  let fixture: ComponentFixture<CreateBonPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBonPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
