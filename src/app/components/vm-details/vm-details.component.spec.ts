import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VmDetailsComponent } from './vm-details.component';

describe('VmDetailsComponent', () => {
  let component: VmDetailsComponent;
  let fixture: ComponentFixture<VmDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VmDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VmDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
