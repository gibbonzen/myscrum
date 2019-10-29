import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // root is dashboard component page
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'backlog',
    loadChildren: './modules/backlog/backlog.module#BacklogModule',
  },
  {
    path: 'sprint',
    loadChildren: './modules/sprint/sprint.module#SprintModule',
  },
  {
    path: 'chat',
    loadChildren: './modules/chat/chat.module#ChatModule'
  },
  { path: '**', component: DashboardComponent } // TODO update with NotFoundComponent

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
