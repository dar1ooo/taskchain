import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ColorChromeModule } from 'ngx-color/chrome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BoardComponent } from './components/dashboard/components/board/board.component';
import { ColorPickerDialogComponent } from './components/dashboard/components/board/ticket-detail/color-picker-dialog/color-picker-dialog.component';
import { TicketDetailComponent } from './components/dashboard/components/board/ticket-detail/ticket-detail.component';
import { ConfirmDialogComponent } from './components/dashboard/components/confirm-dialog/confirm-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { JoinBoardComponent } from './components/dashboard/components/join-board/join-board.component';
import { Extensions } from './shared/extensions';
@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    TicketDetailComponent,
    ConfirmDialogComponent,
    ColorPickerDialogComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    DashboardComponent,
    JoinBoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    EditorModule,
    FormsModule,
    MatMenuModule,
    MatButtonModule,
    ColorChromeModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    HttpClientModule,
  ],
  providers: [Extensions],
  bootstrap: [AppComponent],
})
export class AppModule {}
