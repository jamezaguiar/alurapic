import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Photo } from './photo.model';

const API = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  listUserPhotos(userName: string) {
    return this.http.get<Photo[]>(`${API}${userName}/photos`);
  }
}
