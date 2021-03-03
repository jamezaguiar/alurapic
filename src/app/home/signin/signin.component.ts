import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

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
      },
      (err) => {
        console.log(err);
        alert('Invalid username or password.');
        this.form.reset();
      }
    );
  }
}
