import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { MatSnackBar } from '@angular/material';


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
  //private Indata = {'uid': this.uid, 'fname': this.fullna,'email':this.ueid,'pswd':this.upswd};
  private Indata = {};

  constructor(public snackBar: MatSnackBar, private router: Router, private http: HttpClient) { }



  isUserRegisterSubmitted() {

    this.Indata = { 'uid': this.uid, 'fname': this.fullna, 'email': this.ueid, 'pswd': this.upswd };

    this.http.post('http://localhost:3000/isUserRegisterSubmitted', this.Indata)
      .subscribe(data => {
        if (data == 1) {
          console.log(data);
          document.getElementById("otpopen").classList.add("open");
        } else if (data == 'ER_DUP_ENTRY') {
          console.log("else" + data);
        }

      },
        err => console.log(err),
        () => console.log());
  }

  /*isUserRegisterSubmitted() {


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

  }*/

  reGenerateOTP() {
    this.Indata = { 'rgotp': this.rmid };
    //console.log(this.rotp);
    this.http.post('http://localhost:3000/reGenerateOTP', this.Indata)
      .subscribe(data => {
        console.log(data);
        //this.GetOneComunicationChatHis();
        if (data == 1) {
          this.resnt = true;
          
        }

        else {
          this.resnt = false;
        }
      },
        err => console.log(err),
        () => console.log());

  }

  isOTPVerified() {
    this.Indata = { 'rotp': this.rotp };
    //console.log(this.rotp);
    this.http.post('http://localhost:3000/isOTPVerified', this.Indata)
      //.map(files => files.json())
      .subscribe(data => {
        //console.log("entered");
        console.log(data)
        if (data == 1) {
          // console.log(data);
          document.getElementById("otpst").classList.add("open")
        } else {
          this.snackBar.open("Invalid OTP...", "", {
            duration: 1000,
            panelClass: ['snackbar']
          });
          console.log("else" + data);
        }

      },
        err => console.log(err),
        () => console.log());
    // this.http.get('http://localhost:3000/isOTPVerified.php', {
    //   params: {
    //     otp: this.rotp
    //   }
    // })
    //   .subscribe(data => {
    //     if (data == "True")
    //       document.getElementById("otpst").classList.add("open")

    //   },
    //   err => console.log(err),
    //   () => console.log());
  }
  ngOnInit() {
    //this.registerPOst();
  }

}
