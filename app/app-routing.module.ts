import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'dash', component: DashboardComponent },
  { path: 'frgt', component: ForgotComponent },
  { path: 'rgstr', component: RegisterComponent },
  { path: 'dash/chat/:rid', component: ChatboxComponent },
  {path: '404', component: NotfoundComponent},
  {path: '**', redirectTo: '/404'}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
