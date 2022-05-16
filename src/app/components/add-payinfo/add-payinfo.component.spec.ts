import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayinfoComponent } from './add-payinfo.component';

describe('AddPayinfoComponent', () => {
  let component: AddPayinfoComponent;
  let fixture: ComponentFixture<AddPayinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayinfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
