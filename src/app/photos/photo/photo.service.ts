import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { of, throwError } from 'rxjs';

import { environment as env } from '@env/environment';

import { Photo } from './photo.model';
import { PhotoComment } from './photo-comment.model';

const { API_URL } = env;

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  constructor(private http: HttpClient) {}

  listUserPhotos(userName: string) {
    return this.http.get<Photo[]>(`${API_URL}/${userName}/photos`);
  }

  listUserPhotosPaginated(userName: string, page: Number) {
    const params = new HttpParams().append('page', page.toString());

    return this.http.get<Photo[]>(`${API_URL}/${userName}/photos`, { params });
  }

  getPhotoDetails(photoId: number) {
    return this.http.get<Photo>(`${API_URL}/photos/${photoId}`);
  }

  getPhotoComments(photoId: number) {
    return this.http.get<PhotoComment[]>(
      `${API_URL}/photos/${photoId}/comments`
    );
  }

  addComment(photoId: number, commentText: string) {
    return this.http.post<PhotoComment[]>(
      `${API_URL}/photos/${photoId}/comments`,
      {
        commentText,
      }
    );
  }

  uploadPhoto(description: string, allowComments: boolean, file: File) {
    const formData = new FormData();
    formData.append('description', description);
    formData.append('allowComments', allowComments ? 'true' : 'false');
    formData.append('imageFile', file);

    return this.http.post(`${API_URL}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true,
    });
  }

  likePhoto(photoId: number) {
    return this.http
      .post(`${API_URL}/photos/${photoId}/like`, {}, { observe: 'response' })
      .pipe(map((res) => true))
      .pipe(
        catchError((err) => (err.status == '304' ? of(false) : throwError(err)))
      );
  }

  deletePhoto(photoId: number) {
    return this.http.delete(`${API_URL}/photos/${photoId}`);
  }
}
