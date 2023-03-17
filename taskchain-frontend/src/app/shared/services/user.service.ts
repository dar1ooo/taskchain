import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserModel } from '../models';
import {
  IGetAllUsersRequest,
  IGetBoardsRequest,
  IJoinBoardRequest,
  IRemoveUserRequest,
  IUserRegisterRequest,
} from '../request';
import { IGetBoardsResponse, IJoinBoardResponse } from '../response';
import { IGetAllUsersResponse } from '../response/get-all-users-response';

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

  getAllUsers(request: IGetAllUsersRequest): Observable<IGetAllUsersResponse> {
    const url = this.baseurl + '/users';
    return this.http.post<IGetAllUsersResponse>(url, request);
  }

  removeUser(request: IRemoveUserRequest): Observable<void> {
    const url = this.baseurl + '/removeUser';
    return this.http.post<void>(url, request);
  }
}
