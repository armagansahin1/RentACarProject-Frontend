import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingRentComponent } from './incoming-rent.component';

describe('IncomingRentComponent', () => {
  let component: IncomingRentComponent;
  let fixture: ComponentFixture<IncomingRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomingRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
