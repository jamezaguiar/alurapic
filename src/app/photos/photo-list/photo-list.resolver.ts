import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo.model';
import { PhotoService } from '../photo/photo.service';

@Injectable({
  providedIn: 'root',
})
export class PhotoListResolver implements Resolve<Photo[]> {
  constructor(private photoService: PhotoService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Photo[] | Observable<Photo[]> | Promise<Photo[]> {
    const { userName } = route.params;

    return this.photoService.listUserPhotos(userName);
  }
}
