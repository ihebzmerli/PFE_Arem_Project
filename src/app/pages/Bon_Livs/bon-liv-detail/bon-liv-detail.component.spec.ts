import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivDetailComponent } from './bon-liv-detail.component';

describe('BonLivDetailComponent', () => {
  let component: BonLivDetailComponent;
  let fixture: ComponentFixture<BonLivDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonLivDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
