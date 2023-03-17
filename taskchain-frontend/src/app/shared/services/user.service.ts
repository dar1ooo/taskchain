import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserModel } from '../models';
import {
  IGetBoardsRequest,
  IJoinBoardRequest,
  IUserRegisterRequest,
} from '../request';
import { IGetBoardsResponse, IJoinBoardResponse } from '../response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = ' https://localhost:7079/api/User';

  constructor(private http: HttpClient) {}

  loginUser(userLogin: UserLogin): Observable<UserModel> {
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

  joinBoard(request: IJoinBoardRequest): Observable<IJoinBoardResponse> {
    const url = this.baseurl + '/join';
    return this.http.post<IJoinBoardResponse>(url, request);
  }

  getBoards(request: IGetBoardsRequest): Observable<IGetBoardsResponse> {
    const url = this.baseurl + '/boards';
    return this.http.post<IGetBoardsResponse>(url, request);
  }
}
