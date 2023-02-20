import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogForgetPasswordComponent } from './dialog-forget-password.component';

describe('DialogForgetPasswordComponent', () => {
  let component: DialogForgetPasswordComponent;
  let fixture: ComponentFixture<DialogForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogForgetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
