import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVmComponent } from './add-vm.component';

describe('AddVmComponent', () => {
  let component: AddVmComponent;
  let fixture: ComponentFixture<AddVmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVmComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
