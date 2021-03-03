import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../photo/photo.model';

import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
})
export class PhotoListComponent implements OnInit {
  photos: Photo[] = [];
  filter: string = '';

  constructor(
    private photoService: PhotoService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const { userName } = this.route.snapshot.params;

    this.photoService.listUserPhotos(userName).subscribe((photos) => {
      this.photos = photos;
    });
  }

  onKeyUp(target: EventTarget | null) {
    if (target) {
      let elemento = target as HTMLInputElement;
      this.filter = elemento.value;
    }
  }
}
