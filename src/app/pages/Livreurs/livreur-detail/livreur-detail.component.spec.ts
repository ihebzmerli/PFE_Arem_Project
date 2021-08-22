import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurDetailComponent } from './livreur-detail.component';

describe('LivreurDetailComponent', () => {
  let component: LivreurDetailComponent;
  let fixture: ComponentFixture<LivreurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivreurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
