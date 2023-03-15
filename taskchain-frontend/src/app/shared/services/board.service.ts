import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel, UserLogin, UserModel } from '../models';
import {
  IGetBoardRequest,
  IJoinBoardRequest,
  IUserRegisterRequest,
} from '../request';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private baseurl = 'http://localhost:5079/api/Board';

  constructor(private http: HttpClient) {}

  loadBoard(request: IGetBoardRequest): Observable<BoardModel> {
    const url = this.baseurl + '/login';
    return this.http.post<BoardModel>(url, request);
  }
}
