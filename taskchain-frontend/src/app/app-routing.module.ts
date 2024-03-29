import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './components/dashboard/components/board/board.component';
import { JoinBoardComponent } from './components/dashboard/components/join-board/join-board.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'join', component: JoinBoardComponent },
  { path: 'board', component: BoardComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
  { path: 'page-not-found', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
