import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-artist-dialogbox',
  templateUrl: './artist-dialogbox.component.html',
  styleUrls: ['./artist-dialogbox.component.css']
})
export class ArtistDialogboxComponent implements OnInit {

  artistForm: FormGroup;
  formData: FormData = new FormData();

  constructor(
    private dialogRef: MatDialogRef<ArtistDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data
  ) {
  }

  ngOnInit(): void {
    this.artistForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : null, []],
      name: [this.data.item ? this.data.item.name : '', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      description: [this.data.item ? this.data.item.description : '', [Validators.required, Validators.minLength(3), Validators.maxLength(254)]],
      createdDate: [this.data.item ? new Date(this.data.item.createdDate).toISOString() : '', [Validators.required]],
      photo: [this.data.item ? this.data.item.photoUri : '', []],
      photoFile: new FormControl()
    });
  }

  submit(): void {
    if (this.data.action == 'Delete') {
      this.dialogRef.close({action: this.data.action, item: this.artistForm.value});
    } else {
      if (this.data.item) {
        this.formData.append('id', this.artistForm.controls.id.value);
      }
      this.formData.append('name', this.artistForm.get('name').value);
      this.formData.append('description', this.artistForm.get('description').value);
      this.formData.append('createdDate', new Date(this.artistForm.get('createdDate').value).toISOString());

      this.dialogRef.close({action: this.data.action, item: this.formData});
    }
  }

  photoFileChange(event): void {
    const fileList: FileList = event.target.files;
    this.artistForm.controls.photo.setValue(fileList[0].name);
    this.formData.append('photoFile', fileList[0]);
  }

}
