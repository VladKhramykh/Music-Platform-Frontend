import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../core/services/user.service';
import {Title} from '@angular/platform-browser';
import {Gender} from '../shared/models/gender.model';
import {Country} from '../shared/models/country.model';
import {UserUpdateRequest} from '../shared/models/user-update-request';
import {UserModel} from '../shared/models/user.model';
import {CountryService} from '../../core/services/countries.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup;
  updatedUser: UserUpdateRequest;
  countries: Country[];
  genders: Gender[];
  user: UserModel;
  hide: boolean;

  constructor(
    private userService: UsersService,
    private countryService: CountryService,
    private titleService: Title,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Profile');
    this.createForm();
  }

  createForm() {
    this.user = JSON.parse(localStorage.getItem('user'));

    // this.userService.getGenders().subscribe(data => {
    //   this.genders = data;
    // });

    // this.countryService.getCountries().subscribe(data => {
    //   this.countries = data;
    // });

    this.profileForm = this.formBuilder.group({
      title: ['User information'],
      _id: [this.user ? this.user.id : '', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      photoUri: [''],
      country: [this.countries ? this.countries : [], [Validators.required]],
      gender: [this.genders ? this.genders : [], [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password_conf: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      submitBtn: ['Save'],
      resetBtn: ['Reset']
    });
    this.hide = true;
  }

  save() {
    const id = this.profileForm.get('_id').value;
    const username = this.profileForm.get('username').value;
    const firstName = this.profileForm.get('experience').value;
    const lastName = this.profileForm.get('function').value;
    const email = this.profileForm.get('email').value;
    const country = this.profileForm.get('country').value;
    const gender = this.profileForm.get('gender').value;
    const birthDay = this.profileForm.get('birthDay').value;
    const password = this.profileForm.get('password').value;
    const password_conf = this.profileForm.get('password_conf').value;
    const photoUri = this.profileForm.get('photoUri').value;

    this.updatedUser = {
      id: parseInt(id, 10),
      username: username,
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthday: birthDay,
      countryId: parseInt(country, 10),
      genderId: parseInt(gender, 10),
      password: password,
      photoUri: photoUri
    };

    this.userService.updateUser(this.updatedUser);
  }
}
