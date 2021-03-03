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

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.photos = this.route.snapshot.data['photos'];
  }

  onKeyUp(target: EventTarget | null) {
    if (target) {
      let elemento = target as HTMLInputElement;
      this.filter = elemento.value;
    }
  }
}
