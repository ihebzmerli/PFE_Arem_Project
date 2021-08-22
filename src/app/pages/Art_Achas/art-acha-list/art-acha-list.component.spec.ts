import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtAchaListComponent } from './art-acha-list.component';

describe('ArtAchaListComponent', () => {
  let component: ArtAchaListComponent;
  let fixture: ComponentFixture<ArtAchaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtAchaListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtAchaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
