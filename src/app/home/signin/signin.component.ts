import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../core/auth/auth.service';
import { PlatformDetectorService } from '../../core/platform-detector/platform-detector.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit, AfterViewInit {
  fromUrl!: string;
  form!: FormGroup;
  @ViewChild('userNameInput') userNameInput!: ElementRef<HTMLInputElement>;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private platformDetector: PlatformDetectorService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(
      (params) => (this.fromUrl = params['fromUrl'])
    );

    this.form = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngAfterViewInit(): void {
    if (this.platformDetector.isPlatformBrowser()) {
      this.userNameInput.nativeElement.focus();
    }
  }

  signIn() {
    if (this.form.valid || !this.form.pending) {
      const userName = this.form.get('userName')?.value;
      const password = this.form.get('password')?.value;

      this.auth.authenticate(userName, password).subscribe(
        () => {
          this.fromUrl
            ? this.router.navigateByUrl(this.fromUrl)
            : this.router.navigate(['user', userName]);
        },
        (err) => {
          console.log(err);
          alert('Invalid username or password.');
          this.form.reset();

          // Verify if the current platform is the web browser
          this.platformDetector.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
        }
      );
    }
  }
}
