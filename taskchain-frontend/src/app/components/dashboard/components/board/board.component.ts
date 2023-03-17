import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import {
  BoardColumn,
  BoardModel,
  ConfirmDialogModel,
  TicketModel,
  UserModel,
} from 'src/app/shared/models';
import { ICreateBoardRequest, IGetBoardRequest } from 'src/app/shared/request';
import { ISaveBoardRequest } from 'src/app/shared/request/save-board-request';
import { BoardService } from 'src/app/shared/services/board.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { NewBoardDialogComponent } from './new-board-dialog/new-board-dialog.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs';
export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board: BoardModel = new BoardModel();
  public modelChanged: Subject<BoardModel> = new Subject<BoardModel>();
  private subscription = new Subscription();
  private debounceTime = 1000;
  public user = new UserModel();

  constructor(
    public dialog: MatDialog,
    private boardService: BoardService,
    private snackBar: MatSnackBar,
    private extensions: Extensions
  ) {}

  ngOnInit(): void {
    this.extensions.checkForLogin();
    this.loadBoard();

    this.subscription = this.modelChanged
      .pipe(debounceTime(this.debounceTime))
      .subscribe((res) => {
        this.saveBoard(res);
      });

    this.user = this.extensions.getUser();
  }

  public loadBoard(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id')?.toString();
    if (
      !this.extensions.getUser().boards.find((board) => board.id === boardId) &&
      boardId !== '0'
    ) {
      const ref = this.snackBar.open(
        'You do not have permission to access this board',
        'close',
        {
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        }
      );

      ref.onAction().subscribe(() => {
        window.location.href = '/dashboard';
      });
    } else if (boardId && boardId !== '' && boardId !== '0') {
      const request: IGetBoardRequest = {
        BoardId: boardId,
      };

      this.boardService
        .getBoard(request)
        .pipe(
          tap((res) => {
            this.board = res;
          }),
          catchError((error) => {
            const ref = this.snackBar.open('Loading Board', 'retry', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });

            ref.onAction().subscribe((res) => {
              this.loadBoard();
            });

            return error;
          })
        )
        .subscribe();
    } else if (boardId === '0') {
      const newBoardRef = this.dialog.open(NewBoardDialogComponent, {
        data: new BoardModel(),
        disableClose: true,
        maxHeight: '90vh',
        autoFocus: '__non_existing_element__',
      });

      newBoardRef.afterClosed().subscribe((newBoard: BoardModel) => {
        if (newBoard) {
          this.board = newBoard;
          this.createBoard();
        }
      });
    }
  }

  public createBoard(): void {
    const request: ICreateBoardRequest = {
      boardTitle: this.board.title,
      user: this.extensions.getUser(),
    };

    this.boardService
      .createBoard(request)
      .pipe(
        tap((res) => {
          let user = this.extensions.getUser();
          user.boards.push({ id: res.board.id, title: this.board.title });
          sessionStorage.setItem('user', JSON.stringify(user));
          window.location.href = '/board?id=' + res.board.id;
        }),
        catchError((error) => {
          const ref = this.snackBar.open('Saving Board failed', 'retry', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });

          ref.onAction().subscribe((res) => {
            this.createBoard();
          });

          return error;
        })
      )
      .subscribe();
  }

  public saveBoard(board: BoardModel): void {
    const request: ISaveBoardRequest = {
      board: board,
    };

    this.boardService
      .saveBoard(request)
      .pipe(
        tap((res) => {
          this.board = res.board;
        }),
        catchError((error) => {
          const ref = this.snackBar.open('Saving Board failed', 'retry', {
            horizontalPosition: 'right',
            verticalPosition: 'bottom',
          });

          ref.onAction().subscribe((res) => {
            this.createBoard();
          });

          return error;
        })
      )
      .subscribe();
  }

  public boardChanged(): void {
    this.modelChanged.next(this.board);
  }

  public dropTicket(event: CdkDragDrop<TicketModel[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.boardChanged();
  }

  public openDetail(column: BoardColumn, ticket: TicketModel): void {
    const ticketRef = this.dialog.open(TicketDetailComponent, {
      panelClass: 'ticket-wrapper',
      data: ticket,
      maxHeight: '90vh',
      autoFocus: '__non_existing_element__',
    });

    ticketRef.afterClosed().subscribe((newTicket: TicketModel) => {
      if (newTicket) {
        if (newTicket.deleteTicket) {
          this.deleteTicket(column, newTicket);
        } else {
          var foundIndex = column.tickets.findIndex((x) => x.id === ticket.id);
          column.tickets[foundIndex] = newTicket;
        }
        this.boardChanged();
      }
    });
  }

  public addCard(column: BoardColumn): void {
    const ticketRef = this.dialog.open(TicketDetailComponent, {
      panelClass: 'ticket-wrapper',
      maxHeight: '90vh',
      data: new TicketModel(),
      autoFocus: '__non_existing_element__',
    });

    ticketRef.afterClosed().subscribe((newTicket) => {
      if (newTicket) {
        column.tickets.push(newTicket);
        this.boardChanged();
      }
    });
  }

  public addColumn(): void {
    const column = new BoardColumn();
    this.board.columns.push(column);
    this.boardChanged();
  }

  public deleteColumn(column: BoardColumn): void {
    const message = 'Are you sure you want to delete ' + column.title + ' ?';

    const dialogData = new ConfirmDialogModel({
      title: 'Confirm Action',
      message: message,
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        const index = this.board.columns.indexOf(column, 0);
        if (index > -1) {
          this.board.columns.splice(index, 1);
          this.boardChanged();
        }
      }
    });
  }

  public preventDefault(event: Event): void {
    event.stopPropagation();
  }

  public deleteTicket(column: BoardColumn, ticket: TicketModel): void {
    const message = 'Are you sure you want to delete ' + ticket.title + ' ?';

    const dialogData = new ConfirmDialogModel({
      title: 'Confirm Action',
      message: message,
    });

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData,
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {
      if (dialogResult === true) {
        const index = column.tickets.indexOf(ticket, 0);
        if (index > -1) {
          column.tickets.splice(index, 1);
          this.boardChanged();
        }
      }
    });
  }
}
