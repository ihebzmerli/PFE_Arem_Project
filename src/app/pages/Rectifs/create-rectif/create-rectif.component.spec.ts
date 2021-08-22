import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRectifComponent } from './create-rectif.component';

describe('CreateRectifComponent', () => {
  let component: CreateRectifComponent;
  let fixture: ComponentFixture<CreateRectifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRectifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRectifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
