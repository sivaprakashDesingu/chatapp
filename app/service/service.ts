import { Injectable,Component } from '@angular/core';
import {HomeComponent} from '../home/home.component';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map'
import { Router } from "@angular/router";


@Component({
  providers: [HomeComponent] 
})


@Injectable()
export class ChatService{
   
}

