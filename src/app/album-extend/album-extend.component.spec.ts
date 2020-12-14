import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumExtendComponent } from './album-extend.component';

describe('AlbumExtendComponent', () => {
  let component: AlbumExtendComponent;
  let fixture: ComponentFixture<AlbumExtendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlbumExtendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
