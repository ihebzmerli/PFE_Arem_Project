import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUtilisateurDialogComponent } from './delete-utilisateur-dialog.component';

describe('DeleteUtilisateurDialogComponent', () => {
  let component: DeleteUtilisateurDialogComponent;
  let fixture: ComponentFixture<DeleteUtilisateurDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteUtilisateurDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUtilisateurDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
