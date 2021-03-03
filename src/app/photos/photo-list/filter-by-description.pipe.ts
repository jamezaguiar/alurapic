import { Pipe, PipeTransform } from '@angular/core';

import { Photo } from '../photo/photo.model';

@Pipe({
  name: 'filterByDescription',
})
export class FilterByDescriptionPipe implements PipeTransform {
  transform(photos: Photo[], filter: string): Photo[] {
    filter = filter.trim().toLowerCase();

    if (filter) {
      return photos.filter((photo) =>
        photo.description.trim().toLowerCase().includes(filter)
      );
    } else {
      return photos;
    }
  }
}
