import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDialogboxComponent } from './album-dialogbox.component';

describe('AlbumDialogboxComponent', () => {
  let component: AlbumDialogboxComponent;
  let fixture: ComponentFixture<AlbumDialogboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumDialogboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDialogboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
