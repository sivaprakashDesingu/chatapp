import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotComponent } from './forgot/forgot.component';
import { RegisterComponent } from './register/register.component';
import { ChatboxComponent } from './chatbox/chatbox.component';
import { NotfoundComponent } from './notfound/notfound.component';

/* Material packages */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
/* Material packages */
/* service */
import  { ChatService } from './service/service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    ForgotComponent,
    RegisterComponent,
    ChatboxComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,HttpClientModule,
    FormsModule

  ],
  providers: [ChatService,CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
