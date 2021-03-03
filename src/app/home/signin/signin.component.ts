import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  signIn() {
    const userName = this.form.get('userName')?.value;
    const password = this.form.get('password')?.value;

    this.auth.authenticate(userName, password).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['user', userName]);
      },
      (err) => {
        console.log(err);
        alert('Invalid username or password.');
        this.form.reset();
        this.userNameInput.nativeElement.focus();
      }
    );
  }
}
