import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisapprovedReasonComponent } from './disapproved-reason.component';

describe('DisapprovedReasonComponent', () => {
  let component: DisapprovedReasonComponent;
  let fixture: ComponentFixture<DisapprovedReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisapprovedReasonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisapprovedReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
