import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackDialogboxComponent } from './track-dialogbox.component';

describe('TrackDialogboxComponent', () => {
  let component: TrackDialogboxComponent;
  let fixture: ComponentFixture<TrackDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
