import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeptCoordComponent } from './dept-coord.component';

describe('DeptCoordComponent', () => {
  let component: DeptCoordComponent;
  let fixture: ComponentFixture<DeptCoordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeptCoordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeptCoordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
