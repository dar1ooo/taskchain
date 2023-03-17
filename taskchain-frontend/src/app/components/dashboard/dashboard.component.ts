import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import { BoardModel, UserModel } from 'src/app/shared/models';
import { IGetBoardRequest, IGetBoardsRequest } from 'src/app/shared/request';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public user = new UserModel();

  constructor(
    private extensions: Extensions,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.extensions.checkForLogin();
    this.getBoards();
  }

  private getBoards() {
    const request: IGetBoardsRequest = {
      user: this.extensions.getUser(),
    };

    this.userService
      .getBoards(request)
      .pipe(
        tap((result) => {
          this.user.boards = result.boards;
        }),
        catchError((err) => {
          return err;
        })
      )
      .subscribe();
  }
}
