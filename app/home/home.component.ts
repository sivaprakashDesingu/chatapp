import { Component, OnInit } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { Router } from "@angular/router";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  private ulst;
  private uid;
  private upswd;

  constructor(public snackBar: MatSnackBar,private router: Router,private http: HttpClient,private cookie: CookieService) { }
  getUser() {
    this.http.get('http://localhost:3000/isValiduser', {
      //this.http.get('http://ec2-13-58-255-70.us-east-2.compute.amazonaws.com:3000/', {
      params: {
        uid: this.uid
      }
    })
      .subscribe(data => {
        console.log(data);
        this.ulst= data;
        for(var i=0;i<this.ulst.length;i++){
          if(this.upswd==this.ulst[i].pswd && this.uid==this.ulst[i].uid){
            this.cookie.set( 'luser', this.uid );
            this.cookie.set( 'luname', this.ulst[i].uname );
            this.router.navigate(['/dash']);
          }else{
            this.snackBar.open("Please give me Valide input","", {
              duration: 1000,
              panelClass: ['snackbar']
            });
          }
        }
        if(this.ulst.length==0){
          this.snackBar.open("Please give me a Valid input","", {
            duration: 1000,
            panelClass: ['snackbar']
          });
        }
      },
      err => console.log(err),
      () => console.log());
  }
    isLoggedIn(){
      this.getUser();
    }
  ngOnInit() {
    
    
  }

}
