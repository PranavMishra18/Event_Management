import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveDialogComponent } from '../confirm-dialog/approve-dialog.component';

describe('ApproveDialogComponent', () => {
  let component: ApproveDialogComponent;
  let fixture: ComponentFixture<ApproveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApproveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
