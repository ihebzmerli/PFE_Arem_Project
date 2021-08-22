import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AchatsListComponent } from './achats-list.component';

describe('AchatsListComponent', () => {
  let component: AchatsListComponent;
  let fixture: ComponentFixture<AchatsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AchatsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AchatsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
