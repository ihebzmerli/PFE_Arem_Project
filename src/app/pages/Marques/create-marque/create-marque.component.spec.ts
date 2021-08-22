import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMarqueComponent } from './create-marque.component';

describe('CreateMarqueComponent', () => {
  let component: CreateMarqueComponent;
  let fixture: ComponentFixture<CreateMarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
