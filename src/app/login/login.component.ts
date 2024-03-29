import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {AuthService} from '../../core/services/auth.service';
import {Globals} from '../shared/globals';
import {SessionStorageService} from '../../core/services/session-storage.service';
import {NotificationService} from '../../core/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  rememberMe = new FormControl(false);
  username = new FormControl(localStorage.getItem('savedUsername') ?? '', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]);
  password = new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]);
  loading: boolean;
  hide: boolean;

  constructor(private router: Router,
              private titleService: Title,
              private formBuilder: FormBuilder,
              private sessionStorage: SessionStorageService,
              private notificationService: NotificationService,
              private authService: AuthService,
              private globals: Globals
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Login page');
    this.createForm();
  }

  private createForm() {
    this.loginForm = this.formBuilder.group({
      username: this.username,
      password: this.password,
      rememberMe: this.rememberMe
    });
    this.hide = true;
  }

  login() {
    const username = this.username.value;
    const password = this.password.value;
    const rememberMe = this.rememberMe.value;
    this.loading = true;
    this.authService.login(username, password).subscribe(
      data => {
        this.sessionStorage.saveToken(data.token);
        this.sessionStorage.saveUser(data.user);
        this.globals.user = data.user;
        this.globals.token = data.token;
        localStorage.removeItem('savedUsername');
        if (rememberMe) {
          localStorage.setItem('savedUsername', username);
        }
        this.router.navigateByUrl('/home');
      },
      err => {
        this.notificationService.openSnackBar("Something went wrong");
        this.loading = false;
      }
    );
  }

  resetPassword() {
    // todo
    alert('reset');
  }

  register() {
    this.router.navigate(['/registration']);
  }

}
