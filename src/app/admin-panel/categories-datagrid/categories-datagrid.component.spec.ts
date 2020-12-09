import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDatagridComponent } from './categories-datagrid.component';

describe('CategoriesDatagridComponent', () => {
  let component: CategoriesDatagridComponent;
  let fixture: ComponentFixture<CategoriesDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
