import { Component, OnInit } from '@angular/core';
import { Extensions } from 'src/app/shared/extensions';
import { BoardModel, UserModel } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user = new UserModel();

  constructor(private extensions: Extensions) {}

  ngOnInit(): void {
    this.extensions.checkForLogin();
    this.getBoards();
  }

  public getBoards(): void {
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
