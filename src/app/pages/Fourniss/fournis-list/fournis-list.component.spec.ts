import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisListComponent } from './fournis-list.component';

describe('FournisListComponent', () => {
  let component: FournisListComponent;
  let fixture: ComponentFixture<FournisListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
