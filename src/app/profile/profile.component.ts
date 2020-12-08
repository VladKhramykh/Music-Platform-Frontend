import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../core/services/user.service';
import {Title} from '@angular/platform-browser';
import {UserUpdateRequest} from '../shared/models/user-update-request';
import {UserModel} from '../shared/models/user.model';
import {CountryService} from '../../core/services/countries.service';
import {AuthService} from '../../core/services/auth.service';
import {RequestOptions} from '@angular/http';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

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

  // Form controls
  private http: HttpClient;


  constructor(
    private userService: UsersService,
    private countryService: CountryService,
    private titleService: Title,
    private formBuilder: FormBuilder,
    private authService: AuthService) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Profile');
    this.user = this.authService.getUser();
    this.createForm();
  }

  createForm() {

    // this.userService.getGenders().subscribe(data => {
    //   this.genders = data;
    // });
    //
    // this.countryService.getCountries().subscribe(data => {
    //   this.countries = data;
    // });

    this.profileForm = this.formBuilder.group({
      title: ['User information'],
      _id: new FormControl(this.user ? this.user.id : '', [Validators.required]),
      firstName: new FormControl(this.user.firstName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      lastName: new FormControl(this.user.lastName, [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
      email: new FormControl(this.user.email, [Validators.required, Validators.email]),
      birthday: new FormControl(this.user.birthday, [Validators.required]),
      photoUri: new FormControl(this.user.photoUri),
      profilePhoto: new FormControl(),
      country: new FormControl(this.user.country, [Validators.required]),
      gender: new FormControl(this.user.gender, [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      password_conf: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
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
    const photoUri = this.profileForm.get('photoUri').value;
    const profilePhoto = this.profileForm.get('profilePhoto').value;

    this.updatedUser = {
      id: parseInt(id, 10),
      email: email,
      firstName: firstName,
      lastName: lastName,
      birthday: birthDay,
      country: country,
      gender: gender,
      password: password,
      photoFile: profilePhoto
    };

    console.log(this.updatedUser);

    // this.userService.updateUser(this.updatedUser);
  }

  fileChange(event) {
    this.userService.updatePhoto(event, this.user.id);
  }


}
