import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryDialogData} from '../../shared/models/utils/category-dialog-data.model';

@Component({
  selector: 'app-category-dialogbox',
  templateUrl: './category-dialogbox.component.html',
  styleUrls: ['./category-dialogbox.component.css']
})
export class CategoryDialogboxComponent implements OnInit {
  categoryForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CategoryDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: CategoryDialogData) {
  }

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : null, []],
      name: [this.data.item ? this.data.item.name : '', [Validators.required, Validators.minLength(3),Validators.maxLength(50)]],
      description: [this.data.item ? this.data.item.description : '', [Validators.required, Validators.minLength(3), Validators.maxLength(254)]],
    });
  }

  submit(): void {
    this.dialogRef.close({action: this.data.action, item: this.categoryForm.value});
  }
}
