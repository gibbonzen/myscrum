import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: DashboardComponent }, // root is dashboard component page
  { path: 'dashboard', component: DashboardComponent },
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
