import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel } from '../models';
import {
  ICreateBoardRequest,
  IDeleteBoardRequest,
  IGetBoardRequest,
  ISaveBoardRequest,
} from '../models/request';
import { ICreateBoardResponse, ISaveBoardResponse } from '../models/response';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private baseurl = 'https://localhost:7079/api/Board';

  constructor(private http: HttpClient) {}

  /**
   * API call to load a board
   * @param {IGetBoardRequest} request
   * @return {*}  {Observable<BoardModel>}
   * @memberof BoardService
   */
  getBoard(request: IGetBoardRequest): Observable<BoardModel> {
    const url = this.baseurl + '/board';
    return this.http.post<BoardModel>(url, request);
  }

  /**
   * API call to save a board
   * @param {ISaveBoardRequest} request
   * @return {*}  {Observable<ISaveBoardResponse>}
   * @memberof BoardService
   */
  saveBoard(request: ISaveBoardRequest): Observable<ISaveBoardResponse> {
    const url = this.baseurl + '/save';
    return this.http.post<ISaveBoardResponse>(url, request);
  }

  /**
   * API call to create a new board
   * @param {ICreateBoardRequest} request
   * @return {*}  {Observable<ICreateBoardResponse>}
   * @memberof BoardService
   */
  createBoard(request: ICreateBoardRequest): Observable<ICreateBoardResponse> {
    const url = this.baseurl + '/createBoard';
    return this.http.post<ICreateBoardResponse>(url, request);
  }

  /**
   * API call to delete a board
   * @param {IDeleteBoardRequest} request
   * @return {*}  {Observable<void>}
   * @memberof BoardService
   */
  deleteBoard(request: IDeleteBoardRequest): Observable<void> {
    const url = this.baseurl + '/deleteBoard';
    return this.http.post<void>(url, request);
  }
}
