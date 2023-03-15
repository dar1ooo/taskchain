import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserModel } from '../models';
import { IUserRegisterRequest } from '../request';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = 'http://localhost:5079/api/User';

  constructor(private http: HttpClient) {}

  loginUser(userLogin: UserLogin): Observable<any> {
    const url = this.baseurl + '/login';
    return this.http.post<UserModel>(url, userLogin);
  }

  registerUser(userSignUp: IUserRegisterRequest): Observable<UserModel> {
    const url = this.baseurl + '/register';
    return this.http.post<UserModel>(url, userSignUp);
  }

  getAllUsernames(): Observable<string[]> {
    const url = this.baseurl + '/usernames';
    return this.http.get<string[]>(url);
  }

  getAllTeachers(): Observable<UserModel[]> {
    const url = this.baseurl + '/teachers';
    return this.http.get<UserModel[]>(url);
  }

  updateUser(user: UserModel): Observable<any> {
    const url = this.baseurl + '/update';
    return this.http.post<any>(url, user);
  }

  deleteUser(user: UserModel): Observable<any> {
    const url = this.baseurl + '/delete';
    return this.http.post<any>(url, user);
  }
}
