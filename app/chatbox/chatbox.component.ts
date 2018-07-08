import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  private lgid;
  private rcid;
  private allChats;
  private uniChatId;
  private umsg;
  private rname;
  constructor(private activeRoute: ActivatedRoute,private loc: Location,private http: HttpClient,private cookie: CookieService, ) {}

  goBack(){
    this.loc.back();
  }
  formatAMPM() {
    var d = new Date(),
        sec = d.getSeconds().toString().length == 1 ? '0'+d.getSeconds() : d.getSeconds(),
        minutes = d.getMinutes().toString().length == 1 ? '0'+d.getMinutes() : d.getMinutes(),
        hours = d.getHours().toString().length == 1 ? '0'+d.getHours() : d.getHours(),
        //ampm = d.getHours() >= 12 ? 'pm' : 'am',
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        //days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return months[d.getMonth()]+' '+d.getDate()+' '+d.getFullYear()+' '+hours+':'+minutes+':'+sec;
    }

  isMessageSent(){
    console.log(this.umsg+"-----"+this.uniChatId); 
    console.log(this.formatAMPM());
     this.http.get('http://localhost/chat/isOneComMesSent.php', {
      params: { 
        sid:this.lgid,
        rid: this.rcid,
        msg: this.umsg,
        time:this.formatAMPM(),
        uchat:this.uniChatId 
        
      }
    })
        .subscribe(data => {
          this.GetOneComunicationChatHis();
          
        },
        err => console.log(err),
        () => console.log());

  }


  GetOneComunicationChatHis() {
    this.http.get('http://localhost/chat/whichChatEnabled.php', {
      params: {
        rid:this.rcid,
        luid: this.lgid 
        
      }
    })
        .subscribe(data => {
          this.allChats = data;
          this.uniChatId = data[0].chatid;
          this.rname = data[0].uname;
        },
        err => console.log(err),
        () => console.log(this.allChats));
  }
  ngOnInit() {
    this.lgid = this.cookie.get('luser');
    this.rcid = this.activeRoute.snapshot.params.rid;
    this.GetOneComunicationChatHis();
  }

}
