import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CookieService } from 'ngx-cookie-service';


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

    for(let i =0; i < files.length; i++){
        formData.append("uploads[]", files[i], files[i]['name']);
    }
    console.log('form data variable :   '+ formData.toString());
    this.http.post('http://localhost:3000/upload', formData)
        //.map(files => files.json())
        .subscribe(files => console.log('files', files))
}

fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
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
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

}
