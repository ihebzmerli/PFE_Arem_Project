import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBonLivComponent } from './update-bon-liv.component';

describe('UpdateBonLivComponent', () => {
  let component: UpdateBonLivComponent;
  let fixture: ComponentFixture<UpdateBonLivComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBonLivComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBonLivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
