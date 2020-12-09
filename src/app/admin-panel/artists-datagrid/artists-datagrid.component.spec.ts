import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsDatagridComponent } from './artists-datagrid.component';

describe('ArtistsDatagridComponent', () => {
  let component: ArtistsDatagridComponent;
  let fixture: ComponentFixture<ArtistsDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistsDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistsDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
