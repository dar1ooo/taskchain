import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserLogin, UserModel } from '../models';
import {
  IGetAllUsersRequest,
  IGetBoardsRequest,
  IJoinBoardRequest,
  IRemoveUserRequest,
  IUserLoginRequest,
  IUserRegisterRequest,
} from '../models/request';
import { IGetBoardsResponse, IJoinBoardResponse } from '../models/response';
import { IGetAllUsersResponse } from '../models/response/get-all-users-response';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseurl = ' https://localhost:7079/api/User';

  constructor(private http: HttpClient) {}

  /**
   * API call to login user
   * @param {IUserLoginRequest} request
   * @return {*}  {Observable<UserModel>}
   * @memberof UserService
   */
  loginUser(request: IUserLoginRequest): Observable<UserModel> {
    const url = this.baseurl + '/login';
    return this.http.post<UserModel>(url, request);
  }

  /**
   * API call to register a user
   * @param {IUserRegisterRequest} request
   * @return {*}  {Observable<UserModel>}
   * @memberof UserService
   */
  registerUser(request: IUserRegisterRequest): Observable<UserModel> {
    const url = this.baseurl + '/register';
    return this.http.post<UserModel>(url, request);
  }

  /**
   * API call to get all taken usernames
   * @return {*}  {Observable<string[]>}
   * @memberof UserService
   */
  getAllUsernames(): Observable<string[]> {
    const url = this.baseurl + '/usernames';
    return this.http.get<string[]>(url);
  }

  /**
   * API call to join a board by invite code
   * @param {IJoinBoardRequest} request
   * @return {*}  {Observable<IJoinBoardResponse>}
   * @memberof UserService
   */
  joinBoard(request: IJoinBoardRequest): Observable<IJoinBoardResponse> {
    const url = this.baseurl + '/join';
    return this.http.post<IJoinBoardResponse>(url, request);
  }

  /**
   * API call to get all boards for a user
   * @param {IGetBoardsRequest} request
   * @return {*}  {Observable<IGetBoardsResponse>}
   * @memberof UserService
   */
  getBoards(request: IGetBoardsRequest): Observable<IGetBoardsResponse> {
    const url = this.baseurl + '/boards';
    return this.http.post<IGetBoardsResponse>(url, request);
  }

  /**
   * API call to get all users of a board
   * @param {IGetAllUsersRequest} request
   * @return {*}  {Observable<IGetAllUsersResponse>}
   * @memberof UserService
   */
  getAllUsers(request: IGetAllUsersRequest): Observable<IGetAllUsersResponse> {
    const url = this.baseurl + '/users';
    return this.http.post<IGetAllUsersResponse>(url, request);
  }

  /**
   * API call to remove a user from a board
   * @param {IRemoveUserRequest} request
   * @return {*}  {Observable<void>}
   * @memberof UserService
   */
  removeUser(request: IRemoveUserRequest): Observable<void> {
    const url = this.baseurl + '/removeUser';
    return this.http.post<void>(url, request);
  }
}
