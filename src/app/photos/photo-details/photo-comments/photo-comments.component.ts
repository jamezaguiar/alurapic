import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { PhotoComment } from '../../photo/photo-comment.model';
import { PhotoService } from '../../photo/photo.service';

@Component({
  selector: 'app-photo-comments',
  templateUrl: './photo-comments.component.html',
  styleUrls: ['./photo-comments.component.css'],
})
export class PhotoCommentsComponent implements OnInit {
  @Input() photoId!: number;
  comments$!: Observable<PhotoComment[]>;

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.comments$ = this.photoService.getPhotoComments(this.photoId);
  }
}
