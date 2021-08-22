import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBonPrepComponent } from './update-bon-prep.component';

describe('UpdateBonPrepComponent', () => {
  let component: UpdateBonPrepComponent;
  let fixture: ComponentFixture<UpdateBonPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBonPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBonPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
