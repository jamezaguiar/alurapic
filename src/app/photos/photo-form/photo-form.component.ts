import { HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AlertService } from '../../shared/components/alert/alert.service';
import { UserService } from '../../core/user/user.service';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  form!: FormGroup;
  file!: File;
  preview!: string;
  percentDone = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private photoService: PhotoService,
    private userService: UserService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  handleFile(fileEvent: Event) {
    this.file = (fileEvent.target as HTMLInputElement)?.files![0];

    const reader = new FileReader();
    reader.onload = (event) => (this.preview = event.target?.result as string);
    reader.readAsDataURL(this.file);
  }

  upload() {
    const description = this.form.get('description')?.value;
    const allowComments = this.form.get('allowComments')?.value;

    this.photoService
      .uploadPhoto(description, allowComments, this.file)
      .pipe(
        finalize(() => {
          this.router.navigate(['/user', this.userService.getUserName()]);
        })
      )
      .subscribe(
        (event: HttpEvent<any>) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.percentDone = Math.round(
              (100 * event.loaded) / (event.total ? event.total : 1)
            );
          } else if (event instanceof HttpResponse) {
            this.alertService.success('Upload complete.', true);
          }
        },
        (err) => {
          console.log(err);
          this.alertService.danger('Upload error.', true);
        }
      );
  }
}
