import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDatagridComponent } from './track-datagrid.component';

describe('TrackDatagridComponent', () => {
  let component: TrackDatagridComponent;
  let fixture: ComponentFixture<TrackDatagridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackDatagridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDatagridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
