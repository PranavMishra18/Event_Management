import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqacApprovedComponent } from './iqac-approved.component';

describe('IqacApprovedComponent', () => {
  let component: IqacApprovedComponent;
  let fixture: ComponentFixture<IqacApprovedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IqacApprovedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IqacApprovedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
