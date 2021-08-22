import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEtatLivComponent } from './update-etat-liv.component';

describe('UpdateEtatLivComponent', () => {
  let component: UpdateEtatLivComponent;
  let fixture: ComponentFixture<UpdateEtatLivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEtatLivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEtatLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
