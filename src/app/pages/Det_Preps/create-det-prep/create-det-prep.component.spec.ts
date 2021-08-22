import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDetPrepComponent } from './create-det-prep.component';

describe('CreateDetPrepComponent', () => {
  let component: CreateDetPrepComponent;
  let fixture: ComponentFixture<CreateDetPrepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDetPrepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDetPrepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
