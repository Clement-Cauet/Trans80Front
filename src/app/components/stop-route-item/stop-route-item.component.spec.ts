import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopRouteItemComponent } from './stop-route-item.component';

describe('StopRouteItemComponent', () => {
  let component: StopRouteItemComponent;
  let fixture: ComponentFixture<StopRouteItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopRouteItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopRouteItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
