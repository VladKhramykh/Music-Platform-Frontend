import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../core/services/user.service';
import {Title} from '@angular/platform-browser';
import {UserUpdateRequest} from '../shared/models/user-update-request';
import {UserModel} from '../shared/models/user.model';
import {CountryService} from '../../core/services/countries.service';
import {AuthService} from '../../core/services/auth.service';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {GenderService} from '../../core/services/gender.service';
import {NotificationService} from '../../core/services/notification.service';
import {Globals} from '../shared/globals';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  updatedUser: UserUpdateRequest;
  countries: string[];
  genders: string[];
  user: UserModel;
  hide: boolean;
  dateOfBirth: string;
  profilePhotoUri: string;

  constructor(
    private userService: UsersService,
    private countryService: CountryService,
    private genderService: GenderService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private sessionStorageService: SessionStorageService,
    private notificationService: NotificationService,
    private globals: Globals) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Profile');
    this.user = this.authService.getUser();
    if (this.user.photoUri != null) {
      this.profilePhotoUri = 'http://localhost:8081/img/users/' + this.user.photoUri;
    } else {
      this.profilePhotoUri = '/assets/static/no_photo_profile.jpg';
    }
    this.createForm();
  }

  createForm() {

    this.genderService.getGenders().subscribe(data => {
      this.genders = data;
    });

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });

    this.profileForm = this.formBuilder.group({
      title: ['User information'],
      _id: new FormControl(this.user ? this.user.id : '', [Validators.required]),
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      birthday: new FormControl(new Date(this.user.birthday).toISOString().substring(0, 10), [Validators.required]),
      photoUri: new FormControl(this.profilePhotoUri),
      profilePhoto: new FormControl(),
      country: new FormControl(this.user.country, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      password: new FormControl('', [Validators.minLength(4), Validators.maxLength(50)]),
      password_conf: new FormControl('', [Validators.minLength(4), Validators.maxLength(50)]),
      submitBtn: new FormControl('Save'),
      resetBtn: new FormControl('Reset')
    });
    this.hide = true;
  }

  save() {
    const id = this.profileForm.get('_id').value;
    const firstName = this.profileForm.get('firstName').value;
    const lastName = this.profileForm.get('lastName').value;
    const email = this.profileForm.get('email').value;
    const country = this.profileForm.get('country').value;
    const gender = this.profileForm.get('gender').value;
    const birthDay = this.profileForm.get('birthday').value;
    const password = this.profileForm.get('password').value;
    const password_conf = this.profileForm.get('password_conf').value;

    console.log(birthDay);

    if (password.trim().length > 0 && (password === password_conf)) {
      this.updatedUser = {
        id: parseInt(id, 10),
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthday: birthDay,
        country: country,
        gender: gender,
        password: password
      };
    } else if (password.trim().length === 0 && password_conf.trim().length === 0) {
      this.updatedUser = {
        id: parseInt(id, 10),
        email: email,
        firstName: firstName,
        lastName: lastName,
        birthday: birthDay,
        country: country,
        gender: gender,
        password: ''
      };
    }

    this.userService.updateUser(this.updatedUser).subscribe(
      data => {
        this.sessionStorageService.saveUser(data);
        this.notificationService.openSnackBar('User updated');
      },
      error => {
        this.notificationService.openSnackBar('Error');
      }
    );
  }

  fileChange(event) {
    this.userService.updatePhoto(event, this.user.id);
    this.notificationService.openSnackBar('Photo updated');
  }


}
