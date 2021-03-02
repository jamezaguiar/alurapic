import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  listUserPhotos(userName: string) {
    return this.http.get<{ url: string; description: string }[]>(
      `http://localhost:3000/${userName}/photos`
    );
  }
}
