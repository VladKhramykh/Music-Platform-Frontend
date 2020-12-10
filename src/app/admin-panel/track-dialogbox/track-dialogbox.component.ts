import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Observable} from 'rxjs';
import {Artist} from '../../shared/models/artist.model';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AlbumDialogData} from '../../shared/models/utils/album-dialog-data.model';
import {MusicService} from '../../../core/services/music.service';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-track-dialogbox',
  templateUrl: './track-dialogbox.component.html',
  styleUrls: ['./track-dialogbox.component.css']
})
export class TrackDialogboxComponent implements OnInit {
  trackForm: FormGroup;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredArtists: Observable<Artist[]>;
  selectedArtists: Artist[] = [];
  availableArtists: Artist[] = [];
  types: string[];

  @ViewChild('artistInput') artistInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private dialogRef: MatDialogRef<TrackDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: AlbumDialogData,
    private musicService: MusicService
  ) {
  }

  ngOnInit(): void {
    this.musicService.getArtistsByPage(0, 100, '', 'NAME_ASC').subscribe(
      data => {
        this.availableArtists = data.content;
      }
    );
    this.musicService.getAlbumTypes().subscribe(
      data => {
        this.types = data;
      }
    );

    this.trackForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : null, []],
      name: [this.data.item ? this.data.item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: [this.data.item ? this.data.item.description : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      type: [this.data.item ? this.data.item.type : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      releaseDate: [this.data.item ? new Date(this.data.item.releaseDate).toISOString().substring(0, 10) : '', [Validators.required]],
      artists: [this.data.item ? (this.selectedArtists = this.data.item.artists) : [], [Validators.required]],
    });
    this.filteredArtists = this.trackForm.controls['artists'].valueChanges.pipe(
      startWith(null),
      map((artistName: string | null) => artistName ? this._filter(artistName) : this.availableArtists.slice()));
  }

  submit(): void {
    this.trackForm.controls['artists'].setValue(this.selectedArtists.map(x => x.id));
    this.dialogRef.close({action: this.data.action, item: this.trackForm.value});
  }


  add(event): void {
    const value = event.value;
    if (value) {
      this.selectedArtists.push(value);
    }
  }

  remove(artist: Artist): void {
    const index = this.selectedArtists.indexOf(artist);

    if (index >= 0) {
      this.selectedArtists.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedArtists.push(event.option.value);
    this.artistInput.nativeElement.value = '';
  }

  private _filter(artistName: string): Artist[] {
    const filterValue = artistName;

    return this.availableArtists.filter(artist => artist.name.toLowerCase().includes(filterValue));
  }


}
