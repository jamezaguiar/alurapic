import { Component, OnInit } from '@angular/core';

import { Photo } from '../photo/photo.model';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];

  constructor(private photoService: PhotoService) {}

  ngOnInit(): void {
    this.photoService.listUserPhotos('flavio').subscribe((photos) => {
      this.photos = photos;
    });
  }
}
