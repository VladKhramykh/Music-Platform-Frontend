import {Component, ElementRef, Inject, OnInit, Optional, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {Observable} from "rxjs";
import {MatAutocomplete, MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MusicService} from "../../../core/services/music.service";
import {map, startWith} from "rxjs/operators";
import {UsersService} from "../../../core/services/user.service";
import {UserDialogData} from "../../shared/models/utils/user-dialog-data.model";
import {GenderService} from "../../../core/services/gender.service";
import {CountryService} from "../../../core/services/countries.service";
import {RolesService} from "../../../core/services/roles.service";

@Component({
  selector: 'app-user-dialogbox',
  templateUrl: './user-dialogbox.component.html',
  styleUrls: ['./user-dialogbox.component.css']
})
export class UserDialogboxComponent implements OnInit {

  userForm: FormGroup;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  filteredRoles: Observable<string[]>;
  selectedRoles: string[] = [];
  availableRoles: string[] = [];
  genders: string[];
  countries: string[];

  @ViewChild('roleInput') roleInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(
    private dialogRef: MatDialogRef<UserDialogboxComponent>,
    private formBuilder: FormBuilder,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    private musicService: MusicService,
    private usersService: UsersService,
    private genderService: GenderService,
    private countryService: CountryService,
    private rolesService: RolesService
  ) {
  }

  ngOnInit(): void {
    this.genderService.getGenders().subscribe(data => {
      this.genders = data;
    });

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });
    this.rolesService.getRoles().subscribe(data => {
      this.availableRoles = data;
    });

    // TODO need to fix validation from (while creating this form always invalid)
    this.userForm = this.formBuilder.group({
      id: [this.data.item ? this.data.item.id : 0, []],
      email: [this.data.item ? this.data.item.email : '', [Validators.required, Validators.email]],
      firstName: [this.data.item ? this.data.item.firstName : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: [this.data.item ? this.data.item.lastName : '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      gender: [this.data.item ? this.data.item.gender : '', [Validators.required]],
      country: [this.data.item ? this.data.item.country : '', [Validators.required]],
      birthday: [this.data.item ? new Date(this.data.item.birthday).toISOString().substring(0, 10) : '', [Validators.required]],
      roles: [this.data.item ? (this.selectedRoles = this.data.item.roles) : [], []],
      password: ['', []],
    });
    this.filteredRoles = this.userForm.controls['roles'].valueChanges.pipe(
      startWith(null),
      map((role: string | null) => role ? this._filter(role) : this.availableRoles.slice()));
  }

  submit(): void {
    this.userForm.controls['roles'].setValue(this.selectedRoles.map(x => x));
    this.dialogRef.close({action: this.data.action, item: this.userForm.value});
  }


  add(event): void {
    const value = event.value;
    if (value) {
      this.selectedRoles.push(value);
    }
  }

  remove(role: string): void {
    const index = this.selectedRoles.indexOf(role);

    if (index >= 0) {
      this.selectedRoles.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.selectedRoles.push(event.option.value);
    this.roleInput.nativeElement.value = '';
  }

  private _filter(role: string): string[] {
    const filterValue = role;

    return this.availableRoles.filter(role => role.toLowerCase().includes(filterValue));
  }
}
