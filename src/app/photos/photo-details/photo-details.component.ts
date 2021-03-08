import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { PhotoComment } from '../photo/photo-comment.model';

import { Photo } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css'],
})
export class PhotoDetailsComponent implements OnInit {
  photo$!: Observable<Photo>;
  comments$!: Observable<PhotoComment[]>;

  constructor(
    private route: ActivatedRoute,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.photo$ = this.photoService.getPhotoDetails(params['photoId']);
      this.comments$ = this.photoService.getPhotoComments(params['photoId']);
    });
  }
}
