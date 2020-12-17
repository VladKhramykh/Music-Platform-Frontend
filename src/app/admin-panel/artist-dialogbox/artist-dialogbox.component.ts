import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ArtistDialogData} from '../../shared/models/utils/artist-dialog-data.model';

@Component({
  selector: 'app-artist-dialogbox',
  templateUrl: './artist-dialogbox.component.html',
  styleUrls: ['./artist-dialogbox.component.css']
})
export class ArtistDialogboxComponent implements OnInit {

  artistForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ArtistDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ArtistDialogData) {
  }

  ngOnInit(): void {
    this.artistForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : null, []],
      name: [this.data.item ? this.data.item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [this.data.item ? this.data.item.description : '', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
      createdDate: [this.data.item ? new Date(this.data.item.createdDate).toISOString(): '', [Validators.required]],
    });
  }

  submit(): void {
    this.dialogRef.close({action: this.data.action, item: this.artistForm.value});
  }

}
