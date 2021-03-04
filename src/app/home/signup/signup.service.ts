import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ISignUpData } from './isign-up-data';

const API_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  checkUserNameTaken(userName: string) {
    return this.http.get(`${API_URL}/user/exists/${userName}`);
  }

  signUp(signUpData: ISignUpData) {
    return this.http.post(`${API_URL}/user/signup`, signUpData);
  }
}
