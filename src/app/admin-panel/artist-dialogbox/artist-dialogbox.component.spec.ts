import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDialogboxComponent } from './artist-dialogbox.component';

describe('ArtistDialogboxComponent', () => {
  let component: ArtistDialogboxComponent;
  let fixture: ComponentFixture<ArtistDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
