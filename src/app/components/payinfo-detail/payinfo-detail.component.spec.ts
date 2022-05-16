import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayinfoDetailComponent } from './payinfo-detail.component';

describe('PayinfoDetailComponent', () => {
  let component: PayinfoDetailComponent;
  let fixture: ComponentFixture<PayinfoDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayinfoDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayinfoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
