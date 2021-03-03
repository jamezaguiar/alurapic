import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { IUser } from '../user/IUser';
import { UserService } from '../user/user.service';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private userService: UserService) {}

  authenticate(userName: string, password: string) {
    return this.http
      .post<HttpResponse<IUser>>(
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
          if (authToken) {
            this.userService.setToken(authToken);
            console.log(
              `User ${userName} authenticated with token ${authToken}`
            );
          }
        })
      );
  }
}
