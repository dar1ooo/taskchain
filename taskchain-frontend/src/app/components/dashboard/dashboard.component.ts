import { Component, OnInit } from '@angular/core';
import { BoardModel, UserModel } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user = new UserModel();

  constructor() {}

  ngOnInit(): void {
    this.getBoards();
  }

  public getBoards(): void {
    const sessionUser = sessionStorage.getItem('user');
    if (sessionUser) {
      this.user = JSON.parse(sessionUser) as UserModel;
    } else {
      window.location.href = '/login';
    }
  }

  public loadMockData(): void {
    let board = new BoardModel();
    board.Title = 'Development';
    (board.Id = '1'), this.user.Boards.push(board);

    board = new BoardModel();
    board.Title = 'Releases';
    (board.Id = '2'), this.user.Boards.push(board);

    board = new BoardModel();
    board.Title = 'Support IT';
    (board.Id = '3'), this.user.Boards.push(board);
  }
}
