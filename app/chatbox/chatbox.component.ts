import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Location } from "@angular/common";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Router } from "@angular/router";
import * as io from 'socket.io-client';
import * as $ from 'jquery';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.scss']
})
export class ChatboxComponent implements OnInit {
  private lgid;
  private rcid;
  private receiverProPic;
  private allChats;
  private uniChatId;
  private umsg;
  private rname;
  private usocket;
  socket: SocketIOClient.Socket;
  private postData = {};
  constructor(private activeRoute: ActivatedRoute, private loc: Location, private http: HttpClient, private cookie: CookieService, ) {

    this.socket = io.connect('http://localhost:3000');

  }

  goBack() {
    this.loc.back();
  }
  formatAMPM() {
    var d = new Date(),
      sec = d.getSeconds().toString().length == 1 ? '0' + d.getSeconds() : d.getSeconds(),
      minutes = d.getMinutes().toString().length == 1 ? '0' + d.getMinutes() : d.getMinutes(),
      hours = d.getHours().toString().length == 1 ? '0' + d.getHours() : d.getHours(),
      //ampm = d.getHours() >= 12 ? 'pm' : 'am',
      months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    //days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return months[d.getMonth()] + ' ' + d.getDate() + ' ' + d.getFullYear() + ' ' + hours + ':' + minutes + ':' + sec;
  }

  isMessageSent() {
    //this.socket.emit('sendMessage', {"msg":this.umsg,"to":this.uniChatId});
    this.socket.emit('sendMessage', { "msg": this.umsg, "to": this.uniChatId, "by": this.lgid});
    console.log(this.umsg+"..."+this.rcid);

   
    // this.socket.on("msgReceived", function (data) {
    //   console.log(data);
    // });
    /*this.postData = {"chid":this.uniChatId,"sid":this.lgid,'rid': this.rcid,'msg': this.umsg,'time': this.formatAMPM(),}
    //console.log(this.formatAMPM());
    this.http.post('http://localhost:3000/isOneComMesSent', this.postData)
    .subscribe(data => {
      console.log(data);
    },
      err => console.log(err),
      () => console.log());
      */

  }


  GetOneComunicationChatHis() {
    this.http.get('http://localhost:3000/whichChatEnabled', {
      params: {
        rid: this.rcid,
        luid: this.lgid

      }
    })
      .subscribe(data => {
        this.allChats = data;
        this.uniChatId = data[0].chatid;
        this.rname = data[0].uname;
        this.receiverProPic = "http://www.sarvaamexporters.com/" + data[0].pro_path;
      },
      err => console.log(err),
      () => console.log(this.allChats));
  }

  openMoreOptions() {
    document.getElementById("mrdplst").classList.toggle("expand");
  }
  openUserPro() {
    document.getElementById("othupro").classList.toggle("show");
  }
  rotateCard() {
    document.getElementById("rtcrd").classList.toggle("rotate");
  }
  getCooky() {
    return this.cookie.get('luser');
  }
  private handleMessageReceivedEvent(data): void {
    //console.log(data.by);
    if (data.by == this.lgid) {
      $("#chul").append("<li class='clr'> <p _ngcontent-c1 class='fu fl'>" + data.msg + "</p></li>");
    } else {
      $("#chul").append("<li class='clr'> <p _ngcontent-c1 class='fd fr'>" + data.msg + "</p></li>");
    }
  }

  joinRoom() {
    var urmsl
    this.postData = { 'uid': this.lgid }
    this.http.post('http://localhost:3000/toSetRoom', this.postData)
      .subscribe(data => {
        //console.log(data[0]);
       // urmsl = data;
       for(var i =0;i<Object.keys(data).length;i++){
          this.socket.emit('joinRoom', { "sid": data[i].chatid });
       }
        //console.log(Object.keys(data).length)
      },
      err => console.log(err),
      () => console.log());

  }
    
  ngOnInit() {

    this.lgid = this.cookie.get('luser');
    this.rcid = this.activeRoute.snapshot.params.rid;
    this.GetOneComunicationChatHis();
    this.joinRoom();
    //this.socket.emit('joinRoom', { "sid": '123' });
    this.socket.on("msgReceived", this.handleMessageReceivedEvent.bind(this));

    
  }

}
