import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopItemComponent } from './stop-item.component';

describe('StopItemComponent', () => {
  let component: StopItemComponent;
  let fixture: ComponentFixture<StopItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StopItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
