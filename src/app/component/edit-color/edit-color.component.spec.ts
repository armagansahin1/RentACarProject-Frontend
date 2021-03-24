import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColorComponent } from './edit-color.component';

describe('EditColorComponent', () => {
  let component: EditColorComponent;
  let fixture: ComponentFixture<EditColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditColorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
