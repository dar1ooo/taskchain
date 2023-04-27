import { Component, OnInit } from '@angular/core';
import { BoardModel, UserModel } from 'src/app/shared/models';
import * as data from 'src/assets/demo-data/Boards.json';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public boards: BoardModel[] = [];
  ngOnInit(): void {
    this.loadDemoData();
  }

  public loadDemoData(): void {
    const boards = sessionStorage.getItem('boards');
    if (!boards) {
      var boardsData = JSON.parse(JSON.stringify(data));
      boardsData.default.forEach((board: BoardModel) => {
        this.boards.push(board);
      });

      sessionStorage.setItem('boards', JSON.stringify(this.boards));
    } else {
      const foundBoards = JSON.parse(boards) as BoardModel[];
      this.boards = foundBoards;
    }
  }
}
