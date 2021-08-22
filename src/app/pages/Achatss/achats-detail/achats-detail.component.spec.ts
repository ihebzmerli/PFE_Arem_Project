import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatsDetailComponent } from './achats-detail.component';

describe('AchatsDetailComponent', () => {
  let component: AchatsDetailComponent;
  let fixture: ComponentFixture<AchatsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
