import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisapproveDialogComponent } from './disapprove-dialog.component';

describe('DisapproveDialogComponent', () => {
  let component: DisapproveDialogComponent;
  let fixture: ComponentFixture<DisapproveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisapproveDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisapproveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
