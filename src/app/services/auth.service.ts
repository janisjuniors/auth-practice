import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationBody, RegistrationBody } from '../types/auth';
import {
  AUTH_SERVER_AUTHENTICATE,
  AUTH_SERVER_LOGOUT,
  AUTH_SERVER_REGISTER, AUTH_SERVER_USER,
  LOCAL_DEV_SERVER_URL
} from '../config/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private readonly http: HttpClient) {}

  public register(body: RegistrationBody): Observable<unknown> {
    return this.http.post(LOCAL_DEV_SERVER_URL + AUTH_SERVER_REGISTER, body);
  }

  public authenticate(body: AuthenticationBody): Observable<unknown> {
    return this.http.post(LOCAL_DEV_SERVER_URL + AUTH_SERVER_AUTHENTICATE, body);
  }

  public getUserData(): Observable<unknown> {
    return this.http.get(LOCAL_DEV_SERVER_URL + AUTH_SERVER_USER, { withCredentials: true });
  }

  public logout(body: AuthenticationBody): Observable<unknown> {
    return this.http.post(LOCAL_DEV_SERVER_URL + AUTH_SERVER_LOGOUT, body);
  }
}
