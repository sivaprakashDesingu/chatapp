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

  filesToUpload: Array<File> = [];

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
        //.map(files => files.json())
        .subscribe(files => console.log('files', files))
    } else {
      console.log("Please select an Image file...")
    }
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    console.log(this.filesToUpload[0].type);
    //this.product.photo = fileInput.target.files[0]['name'];


  }
  // localUrl: any[];
  // showPreviewImage(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //       var reader = new FileReader();
  //       reader.onload = (event: any) => {
  //           this.localUrl = event.target.result;
  //           console.log(this.localUrl);
  //       }
  //       reader.readAsDataURL(event.target.files[0]);
  //   }
  //   //console.log(this.localUrl);
  // }
  messageText: string;
  messages: Array<any>;
  socket: SocketIOClient.Socket;
  private url = 'http://localhost:800';

  constructor(private http: HttpClient) {
    //this.socket = io.connect(this.url);
    this.socket = io.connect('http://localhost:8000');
  }

  SendToServer(val,name) {
    console.log(val);
    this.messages = new Array();
    //this.socket.id = "someId";
    //this.socket.join(123);
    //console.log(this.ChatRoomData.id)
    console.log(this.socket.id);
    // this.socket.on('message-received', (msg: any) => {
    //   this.messages.push(msg);
    //   console.log(msg);
    //   console.log(this.messages);
    // });
     
     this.socket.emit('message',{
	        toid :this.socket.id ,
	    		msg : val,
	    		name : name
	        });
    this.socket.on('message2', (data: any) => {
      //console.log(this.socket.id);
      console.log(data.msg);
      //data.msg = '';
    }); 
    
  //  this.socket.on('message2', (data: any) => {
  //     console.log(data.msg);
  //     this.socket.emit('message3', {
  //       msg: 'Yes, its working for me!!'
  //     });
  //   });
  //   this.socket.on('message4', (data: any) => {
  //     console.log(data.msg);
  //   });



    // this.socket.emit('event1', {
    //   msg: 'Client to server, can you hear me server?'
    // });

    // this.socket.on('event2', (data: any) => {
    //   console.log(data.msg);
    //   this.socket.emit('event3', {
    //     msg: 'Yes, its working for me!!'
    //   });
    // });
    // this.socket.on('event4', (data: any) => {
    //   console.log(data.msg);
    // });

  }
  ngOnInit() {
    console.log(this.socket.id);
    //this.SendToServer();

    // this.socket.emit('event1', {
    //   msg: 'Client to server, can you hear me server?'
    // });

    // this.socket.on('event2', (data: any) => {
    //   console.log(data.msg);
    //   this.socket.emit('event3', {
    //     msg: 'Yes, its working for me!!'
    //   });
    // });
    // this.socket.on('event4', (data: any) => {
    //   console.log(data.msg);
    // });

  }

  // sendMessage() {
  //   const message = {
  //     text: this.messageText
  //   };
  //   this.socket.emit('send-message', message);
  //   // console.log(message.text);
  //   this.messageText = '';
  // }

}
