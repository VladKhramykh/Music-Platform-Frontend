import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
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

  emailRegx = /^(([^<>+()\[\]\\.,;:\s@"-#$%&=]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/;


  constructor(private router: Router,
              private titleService: Title,
              private formBuilder: FormBuilder,
              private sessionStorage: SessionStorageService,
              private notificationService: NotificationService,
              private usersService: UsersService,
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Registration');
    this.createForm();
  }

  private createForm() {
    // this.userService.getGenders().subscribe(data => {
    //   this.genders = data;
    // });

    // this.countryService.getCountries().subscribe(data => {
    //   this.countries = data;
    // });

    this.registrationForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailRegx)]],
      birthday: ['', [Validators.required]],
      photoUri: [''],
      country: [[this.countries ? this.countries : [], [Validators.required]]],
      gender:[[this.genders ? this.genders : [], [Validators.required]]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]]
    });
    this.hide = true;
  }

  reset() {
   alert(this.registrationForm.get('username').value);
  }

  save() {
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

  register() {
    // todo
  }


}
