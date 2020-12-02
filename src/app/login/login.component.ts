import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
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
  loading: boolean;
  hide: boolean;

  constructor(private router: Router,
              private titleService: Title,
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
    const savedUsername = localStorage.getItem('savedUsername');

    this.loginForm = new FormGroup({
      username: new FormControl(savedUsername, [Validators.required]),
      password: new FormControl('', Validators.required),
      rememberMe: new FormControl(savedUsername !== null)
    });
    this.hide = true;
  }

  login() {
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    const rememberMe = this.loginForm.get('rememberMe').value;

    this.loading = true;
    this.authService.login(username, password).subscribe(
      data => {
        if (rememberMe) {
          localStorage.setItem('savedUsername', username);
          this.sessionStorage.saveToken(data.token);
          this.sessionStorage.saveUser(data);
        } else {
          this.globals.user = data;
          localStorage.removeItem('savedUsername');
        }
        this.router.navigate(['/home']);
      },
      err => {
        this.notificationService.openSnackBar(err);
        this.loading = false;
      }
    );

  }

  resetPassword() {
    // todo
    alert("reset");
  }

  register() {
    // todo
  }

}
