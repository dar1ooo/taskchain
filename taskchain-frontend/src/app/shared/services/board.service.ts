import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BoardModel } from '../models';
import { IGetBoardRequest } from '../request';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private baseurl = 'http://localhost:7079/api/Board';

  constructor(private http: HttpClient) {}

  loadBoard(request: IGetBoardRequest): Observable<BoardModel> {
    const url = this.baseurl + '/login';
    return this.http.post<BoardModel>(url, request);
  }
}
