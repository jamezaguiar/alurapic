import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  photoId!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.photoId = params['photoId'];

      this.photo$ = this.photoService.getPhotoDetails(this.photoId);
    });
  }

  remove() {
    this.photoService.deletePhoto(this.photoId).subscribe(() => {
      this.router.navigate(['']);
    });
  }
}
