import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BonLivListComponent } from './bon-liv-list.component';

describe('BonLivListComponent', () => {
  let component: BonLivListComponent;
  let fixture: ComponentFixture<BonLivListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BonLivListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BonLivListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
