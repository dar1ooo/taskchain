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
} from 'src/app/shared/models';
import { ICreateBoardRequest, IGetBoardRequest } from 'src/app/shared/request';
import { ISaveBoardRequest } from 'src/app/shared/request/save-board-request';
import { BoardService } from 'src/app/shared/services/board.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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

  constructor(
    public dialog: MatDialog,
    private boardService: BoardService,
    private snackBar: MatSnackBar,
    private extensions: Extensions
  ) {}

  ngOnInit(): void {
    this.extensions.checkForLogin();
    this.loadBoard();
  }

  public loadBoard(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const boardId = urlParams.get('id');

    if (boardId && boardId !== '' && boardId !== '0') {
      const request: IGetBoardRequest = {
        BoardId: boardId,
      };

      this.boardService
        .loadBoard(request)
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
    }

    if (boardId === '0') {
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
          debugger;
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

  public saveBoard(): void {
    const request: ISaveBoardRequest = {
      board: this.board,
      user: this.extensions.getUser(),
    };

    this.boardService
      .saveBoard(request)
      .pipe(
        tap((res) => {
          debugger;
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
        this.saveBoard();
      }
    });
  }

  public addColumn(): void {
    const column = new BoardColumn();
    this.board.columns.push(column);
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
        }
      }
    });
  }

  private loadMockData() {
    const column = new BoardColumn();
    column.title = 'Backlog';
    column.tickets.push(
      new TicketModel({
        id: '1',
        title: 'Get to Work',
        completedChecks: 2,
        totalChecks: 5,
      })
    );
    column.tickets.push(
      new TicketModel({
        id: '2',
        title: 'Pick Up Groceries',
        completedChecks: 2,
        totalChecks: 5,
      })
    );
    column.tickets.push(
      new TicketModel({
        id: '3',
        title: 'Sleep',
        completedChecks: 5,
        totalChecks: 5,
      })
    );

    const column1 = new BoardColumn();
    column1.title = 'to estimate';
    column1.tickets.push(
      new TicketModel({
        id: '4',
        title: 'Get to Work',
        completedChecks: 2,
        totalChecks: 5,
      })
    );
    column1.tickets.push(
      new TicketModel({
        id: '5',
        title: 'Pick Up Groceries',
        completedChecks: 2,
        totalChecks: 5,
      })
    );
    column1.tickets.push(
      new TicketModel({
        id: '6',
        title: 'Sleep',
        completedChecks: 2,
        totalChecks: 5,
      })
    );

    const column2 = new BoardColumn();
    column2.title = 'approved to implement';
    column2.tickets.push(
      new TicketModel({
        id: '7',
        title: 'Get to Work',
      })
    );
    column2.tickets.push(
      new TicketModel({
        id: '8',
        title: 'Pick Up Groceries',
        completedChecks: 2,
        totalChecks: 5,
      })
    );
    column2.tickets.push(
      new TicketModel({
        id: '9',

        title: 'Sleep',
        completedChecks: 5,
        totalChecks: 5,
      })
    );

    const column3 = new BoardColumn();
    column3.title = 'sprint';
    column3.tickets.push(
      new TicketModel({
        id: '10',

        title: 'Get to Work',
      })
    );
    column3.tickets.push(
      new TicketModel({
        id: '11',

        title: 'Pick Up Groceries',
        completedChecks: 2,
        totalChecks: 5,
      })
    );
    column3.tickets.push(
      new TicketModel({
        id: '12',
        title: 'Sleep',
        completedChecks: 5,
        totalChecks: 5,
      })
    );

    this.board.columns.push(column);
    this.board.columns.push(column1);
    this.board.columns.push(column2);
    this.board.columns.push(column3);
  }
}
