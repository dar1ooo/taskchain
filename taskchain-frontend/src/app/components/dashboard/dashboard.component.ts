import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import { UserModel } from 'src/app/shared/models';
import { IGetBoardsRequest } from 'src/app/shared/models/request';
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

  /**
   * Loads all board for the current user
   * @private
   * @memberof DashboardComponent
   */
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
