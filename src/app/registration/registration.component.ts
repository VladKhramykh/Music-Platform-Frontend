import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Globals} from '../shared/globals';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {NotificationService} from '../../core/services/notification.service';
import {Country} from '../shared/models/country.model';
import {Gender} from '../shared/models/gender.model';
import {UsersService} from '../../core/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup;
  loading: boolean;
  countries: Country[];
  genders: Gender[];
  hide: boolean;

  constructor(private router: Router,
              private titleService: Title,
              private sessionStorage: SessionStorageService,
              private notificationService: NotificationService,
              private usersService: UsersService,
              private globals: Globals
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login page');
    this.createForm();
  }

  private createForm() {
    // this.userService.getGenders().subscribe(data => {
    //   this.genders = data;
    // });

    // this.countryService.getCountries().subscribe(data => {
    //   this.countries = data;
    // });

    this.registrationForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      country: new FormControl([this.countries ? this.countries : [], [Validators.required]]),
      gender: new FormControl([this.genders ? this.genders : [], [Validators.required]]),
      password: new FormControl('', Validators.required)
    });
    this.hide = true;
  }

  registration() {
    const username = this.registrationForm.get('username').value;
    const firstName = this.registrationForm.get('firstName').value;
    const lastName = this.registrationForm.get('lastName').value;
    const email = this.registrationForm.get('email').value;
    const birthday = this.registrationForm.get('birthday').value;
    const country = this.registrationForm.get('country').value;
    const gender = this.registrationForm.get('gender').value;
    const password = this.registrationForm.get('password').value;

    this.loading = true;
    // this.usersService.addUser(username, password).subscribe(
    //   data => {
    //     this.router.navigate(['/login']);
    //   },
    //   err => {
    //     this.notificationService.openSnackBar(err);
    //     this.loading = false;
    //   }
    // );

  }

  resetPassword() {
    // todo
    alert('reset');
  }

  register() {
    // todo
  }


}
