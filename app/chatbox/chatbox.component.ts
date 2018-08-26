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
    this.socket.emit('sendMessage', {"msg":this.umsg,"to":'123'});
    this.socket.on("msgReceived",function(data){
      console.log(data);
   });
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

  updateUserSocket() {


   

    this.socket.on('connect', () => {
    this.usocket = this.socket.id;
      this.postData = { 'uid': this.lgid, 'sid': this.usocket }
      console.log(this.postData);
      this.http.post('http://localhost:3000/updateUserSocket', this.postData)
        .subscribe(data => {
          console.log(data);
        },
          err => console.log(err),
          () => console.log());
    });
    // console.log(this.usocket);
    /*this.http.post('http://localhost:3000/updateDataOfUser', this.postData)
      .subscribe(data => {
        console.log(data);
      },
        err => console.log(err),
        () => console.log());*/
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

  ngOnInit() {

    this.lgid = this.cookie.get('luser');
    this.rcid = this.activeRoute.snapshot.params.rid;
    this.GetOneComunicationChatHis();
    //this.updateUserSocket();

    // this.socket.on('connect', () => {
    //   this.usocket = this.socket.id;
    //   this.socket.emit('updateUser', {"uname":this.lgid,"sid":this.usocket});
    // });
    

    // this.socket.on('joinroom', function(data){
    //   this.socket.emit('joinRoom',function(data){
    //     console.log(data);
    //  });
     
      //this.socket.join(this.uniChatId);
      //console.log(this.socket.id);
  // });
  //console.log(this.uniChatId);
  this.socket.emit('joinRoom', {"sid":'123'});

   
   this.socket.on("msgReceived",function(data){
    console.log(data);
    // var parentEle = document.getElementById("chul");
    // //var child = document.createElement("li");
    // var child = document.createElement("<li class='fu fl'>"+data+"</li>");
    // parentEle.appendChild(child);
    // //document.getElementById("chul");
    $("#chul").append("<li> <p class='fu fl'>"+data+"</p></li>");
 });
    
    this.socket.on('event2', (data: any) => {
      console.log(data.msg);

      this.socket.emit('event3', {
        msg: 'Yes, its working for me!!'
      });
    });

    


  }

}
