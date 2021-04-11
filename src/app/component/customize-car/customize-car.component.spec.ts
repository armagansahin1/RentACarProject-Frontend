import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeCarComponent } from './customize-car.component';

describe('CustomizeCarComponent', () => {
  let component: CustomizeCarComponent;
  let fixture: ComponentFixture<CustomizeCarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeCarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
