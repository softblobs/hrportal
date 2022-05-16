import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayInfoComponent } from './pay-info.component';

describe('PayInfoComponent', () => {
  let component: PayInfoComponent;
  let fixture: ComponentFixture<PayInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
