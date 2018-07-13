import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private uid;
  private upswd;
  private fullna;
  private ueid;
  private rmid;
  private resnt = false;
  private rotp;
  constructor(private router: Router, private http: HttpClient) { }


  isUserRegisterSubmitted() {


    this.http.get('http://localhost/chat/isUserRegisterSubmitted.php', {
      params: {
        uid: this.uid, upswd: this.upswd, fullna: this.fullna, ueid: this.ueid
      }
    })
      .subscribe(data => {
        if (data == "True")
          document.getElementById("otpopen").classList.add("open")
      },
      err => console.log(err),
      () => console.log());

  }

  reGenerateOTP() {
    this.http.get('http://localhost/chat/reGenerateOTP.php', {
      params: {
        uid: this.rmid
      }
    })
      .subscribe(data => {
        console.log(data);
        //this.GetOneComunicationChatHis();
        if (data == "True")
          this.resnt = true;
      },
      err => console.log(err),
      () => console.log());

  }

  isOTPVerified() {
    this.http.get('http://localhost/chat/isOTPVerified.php', {
      params: {
        otp: this.rotp
      }
    })
      .subscribe(data => {
        if (data == "True")
          document.getElementById("otpst").classList.add("open")

      },
      err => console.log(err),
      () => console.log());
  }
  ngOnInit() {
  }

}
