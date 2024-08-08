import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IqacComponent } from './iqac.component';

describe('IqacComponent', () => {
  let component: IqacComponent;
  let fixture: ComponentFixture<IqacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IqacComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IqacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
