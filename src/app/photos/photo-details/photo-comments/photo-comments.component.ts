import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { PhotoComment } from '../../photo/photo-comment.model';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css'],
})
export class PhotoCommentsComponent implements OnInit {
  form!: FormGroup;

  @Input() photoId!: number;
  comments$!: Observable<PhotoComment[]>;

  constructor(
    private photoService: PhotoService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getPhotoComments(this.photoId);
    this.form = this.formBuilder.group({
      comment: ['', Validators.maxLength(300)],
    });
  }

  sendComment() {
    this.comments$ = this.photoService
      .addComment(this.photoId, this.form.get('comment')?.value as string)
      .pipe(switchMap(() => this.photoService.getPhotoComments(this.photoId)))
      .pipe(
        tap(() => {
          this.form.reset();
        })
      );
  }
}
