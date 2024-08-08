import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HodApprovedComponent } from './hod-approved.component';

describe('HodApprovedComponent', () => {
  let component: HodApprovedComponent;
  let fixture: ComponentFixture<HodApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HodApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HodApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
