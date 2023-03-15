import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  BoardColumn,
  BoardModel,
  ConfirmDialogModel,
  TicketModel,
} from 'src/app/shared/models';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
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
  public viewmodel: BoardModel = new BoardModel();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadMockData();
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
        if (newTicket.DeleteTicket) {
          this.deleteTicket(column, newTicket);
        } else {
          var foundIndex = column.Tickets.findIndex((x) => x.Id === ticket.Id);
          column.Tickets[foundIndex] = newTicket;
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
        column.Tickets.push(newTicket);
      }
    });
  }

  public addColumn(): void {
    const column = new BoardColumn();
    this.viewmodel.columns.push(column);
  }

  public deleteColumn(column: BoardColumn): void {
    const message = 'Are you sure you want to delete ' + column.Title + ' ?';

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
        const index = this.viewmodel.columns.indexOf(column, 0);
        if (index > -1) {
          this.viewmodel.columns.splice(index, 1);
        }
      }
    });
  }

  public preventDefault(event: Event): void {
    event.stopPropagation();
  }

  public deleteTicket(column: BoardColumn, ticket: TicketModel): void {
    const message = 'Are you sure you want to delete ' + ticket.Title + ' ?';

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
        const index = column.Tickets.indexOf(ticket, 0);
        if (index > -1) {
          column.Tickets.splice(index, 1);
        }
      }
    });
  }

  private loadMockData() {
    const column = new BoardColumn();
    column.Title = 'Backlog';
    column.Tickets.push(
      new TicketModel({
        Id: 1,
        Title: 'Get to Work',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );
    column.Tickets.push(
      new TicketModel({
        Id: 2,
        Title: 'Pick Up Groceries',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );
    column.Tickets.push(
      new TicketModel({
        Id: 3,
        Title: 'Sleep',
        CompletedChecks: 5,
        TotalChecks: 5,
      })
    );

    const column1 = new BoardColumn();
    column1.Title = 'to estimate';
    column1.Tickets.push(
      new TicketModel({
        Id: 4,
        Title: 'Get to Work',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );
    column1.Tickets.push(
      new TicketModel({
        Id: 5,
        Title: 'Pick Up Groceries',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );
    column1.Tickets.push(
      new TicketModel({
        Id: 6,
        Title: 'Sleep',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );

    const column2 = new BoardColumn();
    column2.Title = 'approved to implement';
    column2.Tickets.push(
      new TicketModel({
        Id: 7,
        Title: 'Get to Work',
      })
    );
    column2.Tickets.push(
      new TicketModel({
        Id: 8,
        Title: 'Pick Up Groceries',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );
    column2.Tickets.push(
      new TicketModel({
        Id: 9,

        Title: 'Sleep',
        CompletedChecks: 5,
        TotalChecks: 5,
      })
    );

    const column3 = new BoardColumn();
    column3.Title = 'sprint';
    column3.Tickets.push(
      new TicketModel({
        Id: 10,

        Title: 'Get to Work',
      })
    );
    column3.Tickets.push(
      new TicketModel({
        Id: 11,

        Title: 'Pick Up Groceries',
        CompletedChecks: 2,
        TotalChecks: 5,
      })
    );
    column3.Tickets.push(
      new TicketModel({
        Id: 12,
        Title: 'Sleep',
        CompletedChecks: 5,
        TotalChecks: 5,
      })
    );

    this.viewmodel.columns.push(column);
    this.viewmodel.columns.push(column1);
    this.viewmodel.columns.push(column2);
    this.viewmodel.columns.push(column3);
  }
}