import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeanApprovedComponent } from './dean-approved.component';

describe('DeanApprovedComponent', () => {
  let component: DeanApprovedComponent;
  let fixture: ComponentFixture<DeanApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeanApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeanApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
