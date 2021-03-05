import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css'],
})
export class PhotoFormComponent implements OnInit {
  form!: FormGroup;
  fileEvent!: Event;
  file!: File;

  constructor(
    private formBuilder: FormBuilder,
    private photoService: PhotoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true],
    });
  }

  upload() {
    const description = this.form.get('description')?.value;
    const allowComments = this.form.get('allowComments')?.value;

    this.file = (this.fileEvent.target as HTMLInputElement)?.files![0];

    this.photoService
      .uploadPhoto(description, allowComments, this.file)
      .subscribe(() => this.router.navigate(['']));
  }
}
