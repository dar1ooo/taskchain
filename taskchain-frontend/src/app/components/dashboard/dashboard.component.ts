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
    this.user = this.extensions.getUser();
  }

  public loadMockData(): void {
    let board = new BoardModel();
    board.title = 'Development';
    (board.id = '1'), this.user.boards.push(board);

    board = new BoardModel();
    board.title = 'Releases';
    (board.id = '2'), this.user.boards.push(board);

    board = new BoardModel();
    board.title = 'Support IT';
    (board.id = '3'), this.user.boards.push(board);
  }
}
