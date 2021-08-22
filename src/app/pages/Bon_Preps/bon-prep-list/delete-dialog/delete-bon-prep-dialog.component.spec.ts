import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBonPrepDialogComponent } from './delete-bon-prep-dialog.component';

describe('DeleteBonPrepDialogComponent', () => {
  let component: DeleteBonPrepDialogComponent;
  let fixture: ComponentFixture<DeleteBonPrepDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBonPrepDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBonPrepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
