import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopTimeItemComponent } from './stop-time-item.component';

describe('StopTimeItemComponent', () => {
  let component: StopTimeItemComponent;
  let fixture: ComponentFixture<StopTimeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopTimeItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopTimeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
