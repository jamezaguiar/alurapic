import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { lowerCaseValidator } from '../../shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';

import { ISignUpData } from './isign-up-data';

import { SignupService } from './signup.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserNotTakenValidatorService],
})
export class SignupComponent implements OnInit, AfterViewInit {
  form!: FormGroup;
  @ViewChild('emailInput') emailInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private userNotTakenValidator: UserNotTakenValidatorService,
    private signUpService: SignupService,
    private router: Router,
    private platformDetector: PlatformDetectorService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],

      fullName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40),
        ],
      ],

      userName: [
        '',
        [
          Validators.required,
          lowerCaseValidator,
          Validators.minLength(2),
          Validators.maxLength(30),
        ],
        this.userNotTakenValidator.checkUserNameTaken(),
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(14),
        ],
      ],
    });
  }

  ngAfterViewInit(): void {
    if (this.platformDetector.isPlatformBrowser()) {
      this.emailInput.nativeElement.focus();
    }
  }

  signUp() {
    const newUser = this.form.getRawValue() as ISignUpData;
    this.signUpService
      .signUp(newUser)
      .subscribe(() => this.router.navigate(['']));
  }
}
