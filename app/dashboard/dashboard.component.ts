import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private lgid;
  private lguser;
  private userchats;
  private srfr;     //variable for global search
  private srfrlst;
  isSearchVisible: boolean;
  isUserProvileEnabled :boolean;

  constructor(private router: Router,private cookie: CookieService,private loc: Location,private http: HttpClient) { }
  goBack(){
    this.loc.back();
  }
  enableSearchFun(){
    this.isSearchVisible = true;
  }
  closeSearchFun(){
    this.isSearchVisible = false;
  }
  enableUProfile(){
    this.isUserProvileEnabled = true;
  }
  closeUProfile(){
    this.isUserProvileEnabled = false;
  }
  isChatEnabled(rid){
    console.log(rid);
    // this.http.get('http://localhost/chat/whichChatEnabled.php', {
    //   params: {
    //     luid: rid,

    //   }
    // })
    //     .subscribe(data => {
    //       this.userchats = data;
    //     },
    //     err => console.log(err),
    //     () => console.log(this.userchats));



     this.router.navigate(['/dash/chat/',rid]);
  }

isFoundFriend(){
  //console.log(this.srfr);
  this.http.get('http://localhost:3000/Searchyourfriend', {
      params: {
        srchkey: this.srfr
      }
    })
        .subscribe(data => {
          this.srfrlst = data;
        },
        err => console.log(err),
        () => console.log());
}

  getUserChats() {
    this.http.get('http://localhost:3000/getMsgOfUser', {
      params: {
        uid: this.lgid,
      }
    })
        .subscribe(data => {
          this.userchats = data;
        },
        err => console.log(err),
        () => console.log(this.userchats));
  }
  ngOnInit() {
    this.lgid = this.cookie.get('luser');
    this.lguser = this.cookie.get('luname');
    this.getUserChats();
  }

}
