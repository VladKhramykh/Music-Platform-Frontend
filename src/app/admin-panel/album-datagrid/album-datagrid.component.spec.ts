import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDatagridComponent } from './album-datagrid.component';

describe('AlbumDatagridComponent', () => {
  let component: AlbumDatagridComponent;
  let fixture: ComponentFixture<AlbumDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
