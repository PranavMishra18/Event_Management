import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DcApprovedComponent } from './dc-approved.component';

describe('DcApprovedComponent', () => {
  let component: DcApprovedComponent;
  let fixture: ComponentFixture<DcApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DcApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DcApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
