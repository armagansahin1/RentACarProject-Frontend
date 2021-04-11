import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomizeUserComponent } from './customize-user.component';

describe('CustomizeUserComponent', () => {
  let component: CustomizeUserComponent;
  let fixture: ComponentFixture<CustomizeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomizeUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomizeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
