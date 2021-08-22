import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLivreurComponent } from './create-livreur.component';

describe('CreateLivreurComponent', () => {
  let component: CreateLivreurComponent;
  let fixture: ComponentFixture<CreateLivreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLivreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
