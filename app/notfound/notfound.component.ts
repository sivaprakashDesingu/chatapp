import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';
import * as io from 'socket.io-client';


@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent implements OnInit {

  /*filesToUpload: Array<File> = [];

  upload() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    if (files[0].type == "image/jpg" || files[0].type == "image/png" || files[0].type == "image/jpeg") {
      for (let i = 0; i < files.length; i++) {
        formData.append("uploads[]", files[i], 'sp_profile.jpg');
      }
      console.log('form data variable :   ' + formData.toString());
      this.http.post('http://localhost:3000/upload', formData)
        .subscribe(files => console.log('files', files))
    }else{
       console.log("Please select an Image file...")
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload[0].type);
  }*/


  messageText: string;
  messages: Array<any>;
  socket: SocketIOClient.Socket;
  constructor(private http: HttpClient) {
     this.socket = io.connect('http://localhost:3000');
    //this.socket = io.connect();
  }

  ngOnInit() {
    this.messages = new Array();

    this.socket.on('message-received', (msg: any) => {
      this.messages.push(msg);
      console.log(msg);
      console.log(this.messages);
    });
    this.socket.emit('event1', {
      msg: 'Client to server, can you hear me server?'
    });
    this.socket.on('event2', (data: any) => {
      console.log(data.msg);
      this.socket.emit('event3', {
        msg: 'Yes, its working for me!!'
      });
    });
    this.socket.on('event4', (data: any) => {
      console.log(data.msg);
    });
  }

  sendMessage() {
    const message = {
      text: this.messageText
    };
    this.socket.emit('send-message', message);
    // console.log(message.text);
    this.messageText = '';
  }





}
