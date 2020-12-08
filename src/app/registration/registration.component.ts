import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {NotificationService} from '../../core/services/notification.service';
import {UsersService} from '../../core/services/user.service';
import {UserCreateRequest} from '../shared/models/user-create-request';
import {GenderService} from '../../core/services/gender.service';
import {CountryService} from '../../core/services/countries.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registrationForm: FormGroup;
  loading: boolean;
  user: UserCreateRequest;
  countries: string[];
  genders: string[];
  hide: boolean;
  dateOfBirth: string;

  constructor(private router: Router,
              private titleService: Title,
              private formBuilder: FormBuilder,
              private sessionStorage: SessionStorageService,
              private notificationService: NotificationService,
              private usersService: UsersService,
              private genderService: GenderService,
              private countryService: CountryService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Registration');
    this.createForm();
  }

  private createForm() {
    this.genderService.getGenders().subscribe(data => {
      this.genders = data;
    });

    this.countryService.getCountries().subscribe(data => {
      this.countries = data;
    });

    this.registrationForm = this.formBuilder.group({
      title: ['Registration'],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      birthday: ['', [Validators.required]],
      photoUri: [''],
      country: [[this.countries && this.countries.length > 0 ? this.countries[0] : [], [Validators.required]]],
      gender: [[this.genders && this.genders.length > 0 ? this.genders[0] : [], [Validators.required]]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
    this.hide = true;
  }

  reset() {
    alert(this.registrationForm.get('username').value);
  }

  save() {
    this.loading = true;

    const firstName: string = this.registrationForm.get('firstName').value;
    const lastName: string = this.registrationForm.get('lastName').value;
    const email: string = this.registrationForm.get('email').value;
    const birthday: string = this.registrationForm.get('birthday').value;
    const country: string = this.registrationForm.get('country').value;
    const gender: string = this.registrationForm.get('gender').value;
    const password: string = this.registrationForm.get('password').value;

    this.user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      birthday: birthday,
      country: country,
      photoUri: '',
      gender: gender,
      password: password
    };

    console.log(this.dateOfBirth);
    this.usersService.addUser(this.user).subscribe(
      data => {
        console.log(data);
        // this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        this.notificationService.openSnackBar(err);
        this.loading = false;
      }
    );
  }
}
