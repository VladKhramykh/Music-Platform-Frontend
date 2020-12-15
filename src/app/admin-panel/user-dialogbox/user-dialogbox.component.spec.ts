import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDialogboxComponent } from './user-dialogbox.component';

describe('UserDialogboxComponent', () => {
  let component: UserDialogboxComponent;
  let fixture: ComponentFixture<UserDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
