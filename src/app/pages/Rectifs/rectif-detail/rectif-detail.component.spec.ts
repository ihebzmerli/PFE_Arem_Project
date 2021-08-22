import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectifDetailComponent } from './rectif-detail.component';

describe('RectifDetailComponent', () => {
  let component: RectifDetailComponent;
  let fixture: ComponentFixture<RectifDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RectifDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RectifDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
