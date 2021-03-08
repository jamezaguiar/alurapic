import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from '@env/environment';

import { ISignUpData } from './isign-up-data';

const { API_URL } = env;

@Injectable()
export class SignupService {
  constructor(private http: HttpClient) {}

  checkUserNameTaken(userName: string) {
    return this.http.get(`${API_URL}/user/exists/${userName}`);
  }

  signUp(signUpData: ISignUpData) {
    return this.http.post(`${API_URL}/user/signup`, signUpData);
  }
}
