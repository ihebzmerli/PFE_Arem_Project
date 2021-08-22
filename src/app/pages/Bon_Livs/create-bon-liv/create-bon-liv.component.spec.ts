import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBonLivComponent } from './create-bon-liv.component';

describe('CreateBonLivComponent', () => {
  let component: CreateBonLivComponent;
  let fixture: ComponentFixture<CreateBonLivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateBonLivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateBonLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
