import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedEventAnalyticsComponent } from './completed-event-analytics.component';

describe('CompletedEventAnalyticsComponent', () => {
  let component: CompletedEventAnalyticsComponent;
  let fixture: ComponentFixture<CompletedEventAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompletedEventAnalyticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompletedEventAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
