import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, debounceTime, Subject, Subscription, tap } from 'rxjs';
import { Extensions } from 'src/app/shared/extensions';
import {
  BoardColumn,
  BoardModel,
  ConfirmDialogModel,
  TicketModel,
  UserModel,
} from 'src/app/shared/models';
import {
  ICreateBoardRequest,
  IGetBoardRequest,
} from 'src/app/shared/models/request';
import { ISaveBoardRequest } from 'src/app/shared/models/request/save-board-request';
import { BoardService } from 'src/app/shared/services/board.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { BoardSettingsComponent } from './board-settings/board-settings.component';
import { NewBoardDialogComponent } from './new-board-dialog/new-board-dialog.component';
import { TicketDetailComponent } from './ticket-detail/ticket-detail.component';
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
  private debounceTime = 2000;
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

  /**
   * Load the current board
   * @memberof BoardComponent
   */
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

  /**
   * Creates a new Board
   * @memberof BoardComponent
   */
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

  /**
   * Saves the current board
   * @param {BoardModel} board
   * @memberof BoardComponent
   */
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

  /**
   * Event when a ticket is moved
   * @param {CdkDragDrop<TicketModel[]>} event
   * @memberof BoardComponent
   */
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
    this.saveBoard(this.board);
  }

  public openDetail(column: BoardColumn, ticket: TicketModel): void {
    const ticketRef = this.dialog.open(TicketDetailComponent, {
      panelClass: 'ticket-wrapper',
      data: ticket,
      height: '85vh',
      maxHeight: '90vh',
      maxWidth: '50vw',
      width: '50vw',
      autoFocus: '__non_existing_element__',
    });

    ticketRef.afterClosed().subscribe(() => {
      const targetTicket = { ...ticket };
      const foundIndex = column.tickets.findIndex(
        (ticket) => ticket === targetTicket
      );

      column.tickets[foundIndex] = { ...ticket };
      this.saveBoard(this.board);
    });
  }

  /**
   * Adds a new ticket to the column
   * @param {BoardColumn} column
   * @memberof BoardComponent
   */
  public addTicket(column: BoardColumn): void {
    const ticketRef = this.dialog.open(TicketDetailComponent, {
      panelClass: 'ticket-wrapper',
      height: '85vh',
      maxHeight: '90vh',
      maxWidth: '50vw',
      width: '50vw',
      data: new TicketModel(),
      autoFocus: '__non_existing_element__',
      disableClose: true,
    });

    ticketRef.afterClosed().subscribe((newTicket: TicketModel) => {
      if (newTicket) {
        newTicket.completedChecks = newTicket.tasks.filter(
          (task) => task.isDone
        ).length;

        newTicket.totalChecks = newTicket.tasks.length;
        column.tickets.push({ ...newTicket });
        this.saveBoard(this.board);
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

  /**
   * Prevents parent click on ticket menu
   * @param {Event} event
   * @memberof BoardComponent
   */
  public preventDefault(event: Event): void {
    event.stopPropagation();
  }

  /**
   * Deletes the selected ticket
   * @param {BoardColumn} column
   * @param {TicketModel} ticket
   * @memberof BoardComponent
   */
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
        const columnIndex = this.board.columns.indexOf(column, 0);
        const index = this.board.columns[columnIndex].tickets.indexOf(
          ticket,
          0
        );
        if (index > -1) {
          this.board.columns[columnIndex].tickets.splice(index, 1);
          this.saveBoard(this.board);
        }
      }
    });
  }

  public openSettings(): void {
    const dialogRef = this.dialog.open(BoardSettingsComponent, {
      data: this.board,
      width: '30vw',
    });

    dialogRef.afterClosed().subscribe((dialogResult) => {});
  }
}
