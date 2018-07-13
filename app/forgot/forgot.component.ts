import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  private uid;
  private fienb = false;
  private rotp;
  private rsuid;
  private rpswd;
  forgotPswdOTP() {
    this.http.get('http://localhost/chat/forgotPswdOtp.php', {
      params: {
        uid: this.uid
      }
    })
      .subscribe(data => {
        if (data == "True")
          document.getElementById("otpv").classList.add("open")
      },
      err => console.log(err),
      () => console.log());
  }


  isvalidRstOTP() {
    this.http.get('http://localhost/chat/checkValidOTP.php', {
      params: {
        otp: this.rotp
      }
    })
      .subscribe(data => {
        
        this.rsuid = data;

        if (this.rsuid.length>0) {
          //this.fienb = true;
          document.getElementById("rst").classList.add("open");

        }

      },
      err => console.log(err),
      () => console.log(this.rsuid));
  }

  isResetDone() {
    this.http.get('http://localhost/chat/isResetfinished.php', {
      params: {
        uid:this.rsuid[0].uid,pswd: this.rpswd
      }
    })
      .subscribe(data => {
        console.log(data);
        if (data == "True") {
          this.fienb = true;
        }

      },
      err => console.log(err),
      () => console.log());
  }
  constructor(private router: Router, private http: HttpClient) { }


  ngOnInit() {
  }

}
