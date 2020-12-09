import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryDialogboxComponent } from './category-dialogbox.component';

describe('CategoryDialogboxComponent', () => {
  let component: CategoryDialogboxComponent;
  let fixture: ComponentFixture<CategoryDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
