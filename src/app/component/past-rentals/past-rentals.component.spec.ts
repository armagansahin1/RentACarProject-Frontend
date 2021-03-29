import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastRentalsComponent } from './past-rentals.component';

describe('PastRentalsComponent', () => {
  let component: PastRentalsComponent;
  let fixture: ComponentFixture<PastRentalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastRentalsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastRentalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
