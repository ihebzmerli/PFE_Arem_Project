import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAchaDetailComponent } from './art-acha-detail.component';

describe('ArtAchaDetailComponent', () => {
  let component: ArtAchaDetailComponent;
  let fixture: ComponentFixture<ArtAchaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtAchaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtAchaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
