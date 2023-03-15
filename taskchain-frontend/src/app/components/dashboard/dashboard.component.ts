import { Component, OnInit } from '@angular/core';
import { BoardModel } from 'src/app/shared/models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public boards: BoardModel[] = [];
  constructor() {}

  ngOnInit(): void {
    this.loadMockData();
  }

  public loadMockData(): void {
    let board = new BoardModel();
    board.Title = 'Development';
    (board.Id = '1'), this.boards.push(board);

    board = new BoardModel();
    board.Title = 'Releases';
    (board.Id = '2'), this.boards.push(board);

    board = new BoardModel();
    board.Title = 'Support IT';
    (board.Id = '3'), this.boards.push(board);
  }
}
