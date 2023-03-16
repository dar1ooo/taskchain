import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel } from '../models';
import {
  ICreateBoardRequest,
  IGetBoardRequest,
  ISaveBoardRequest,
} from '../request';
import { ICreateBoardResponse, ISaveBoardResponse } from '../response';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private baseurl = 'https://localhost:7079/api/Board';

  constructor(private http: HttpClient) {}

  getBoard(request: IGetBoardRequest): Observable<BoardModel> {
    const url = this.baseurl + '/board';
    return this.http.post<BoardModel>(url, request);
  }

  saveBoard(request: ISaveBoardRequest): Observable<ISaveBoardResponse> {
    const url = this.baseurl + '/save';
    return this.http.post<ISaveBoardResponse>(url, request);
  }

  createBoard(request: ICreateBoardRequest): Observable<ICreateBoardResponse> {
    const url = this.baseurl + '/createBoard';
    return this.http.post<ICreateBoardResponse>(url, request);
  }
}
