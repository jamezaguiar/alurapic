import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authenticate(userName: string, password: string) {
    return this.http
      .post<HttpResponse<{ id: number; name: string; email: string }>>(
        `${API_URL}/user/login`,
        {
          userName,
          password,
        },
        { observe: 'response' }
      )
      .pipe(
        tap((response) => {
          const authToken = response.headers.get('x-access-token');
          console.log(`User ${userName} authenticated with token ${authToken}`);
        })
      );
  }
}
