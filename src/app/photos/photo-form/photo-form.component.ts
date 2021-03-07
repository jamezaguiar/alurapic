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
  file!: File;
  preview!: string;

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
      .subscribe(() => this.router.navigate(['']));
  }
}
