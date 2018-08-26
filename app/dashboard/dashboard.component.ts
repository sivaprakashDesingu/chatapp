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
  private lupic;
  private userchats;
  private srfr;     //variable for global search
  private srfrlst;
  isSearchVisible: boolean;
  isUserProvileEnabled: boolean;
  isProSett: boolean;
  isProFfSett: boolean;
  isProFfPenSett: boolean;

  /* user profile variable */
  private uemail;
  private uloc;
  private status;
  private phn;
  private upro_path;
  private ucover_path;


  private postData = {};
  constructor(private router: Router, private cookie: CookieService, private loc: Location, private http: HttpClient) {

    this.isProSett = true;
  }
  goBack() {
    this.loc.back();
  }
  enableSearchFun() {
    this.isSearchVisible = true;
  }
  closeSearchFun() {
    this.isSearchVisible = false;
  }
  addrmclass(adc, rmc, whrm, st) {
    document.getElementById(adc).classList.add('show');
    document.getElementById(rmc).classList.remove('show');
    if (st == "yes")
      document.getElementById(whrm).removeAttribute("readonly");
    else
      document.getElementById(whrm).setAttribute("readonly", "readonly");
  }

  CancelUpdateDataOfUser(uAttr, adc, rmc, id, st) {
    this.enableUProfile();
    this.lguser = this.cookie.get('luname');
    this.addrmclass(adc, rmc, id, st);
  }
  updateDataOfUser(uAttr, adc, rmc, id, st) {
    console.log(uAttr);
    if (uAttr == "uname")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.lguser }
    else if (uAttr == "email")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.uemail }
    else if (uAttr == "phone")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.phn }
    else if (uAttr == "status")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.status }
    else if (uAttr == "location")
      this.postData = { 'attr': uAttr, 'uid': this.lgid, 'toBeUpdated': this.uloc }

    this.http.post('http://localhost:3000/updateDataOfUser', this.postData)
      .subscribe(data => {
        if (data == 1) {
          this.addrmclass(adc, rmc, id, st);
          console.log(data);
          if (uAttr == "uname") {
            this.cookie.set('luname', this.lguser);
            this.lguser = this.cookie.get('luname');
          }

          // document.getElementById("otpopen").classList.add("open");
        } else if (data == 'ER_DUP_ENTRY') {
          console.log("else" + data);
        }

      },
        err => console.log(err),
        () => console.log());
  }
  enableUProfile() {
    this.isUserProvileEnabled = true;
    this.http.get('http://localhost:3000/userProfileDetails', {
      params: {
        uid: this.lgid,

      }
    })
      .subscribe(data => {
        //this.userchats = data;
        this.uemail = data[0].email;
        this.phn = data[0].phone;
        this.status = data[0].status;
        this.uloc = data[0].location;
        this.upro_path = "http://www.sarvaamexporters.com/" + data[0].pro_path;
        this.ucover_path = "http://www.sarvaamexporters.com/" + data[0].cover_path;

      },
        err => console.log(err),
        () => console.log());


  }
  closeUProfile() {
    this.isUserProvileEnabled = false;
  }


  enalbeProSett() {
    this.isProSett = true;
    this.isProFfSett = false;
    this.isProFfPenSett = false;
  }

  enalbeFrsSett() {
    this.isProFfSett = true;
    this.isProFfPenSett = false;
    this.isProSett = false;
  }
  enalbeFrPenSett() {
    this.isProFfPenSett = true;
    this.isProFfSett = false;
    this.isProSett = false;

  }


  userProfileChange(event, whi) {
    const formData: any = new FormData();
    const files: Array<File> = event.target.files[0];
    var imgtype = event.target.files[0].type;
    imgtype = imgtype.split("/");
    if (whi == "profile") {
      formData.append("uploads[]", files, this.lgid + "_profile." + imgtype[1]);
      
      this.http.post('http://localhost:3000/userProImageUpdate', formData)
      .subscribe(files => {
        //console.log('files', files);
        this.enableUProfile();
      })
    } else {
      formData.append("uploads[]", files, this.lgid + "_cover." + imgtype[1]);
     
      this.http.post('http://localhost:3000/userProImageUpdate', formData)
        .subscribe(files => {
          //console.log('files', files);
          this.enableUProfile();
        })
    }


  }


  isChatEnabled(rid) {
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



    this.router.navigate(['/dash/chat/', rid]);
  }

  isFoundFriend() {
    //console.log(this.srfr);
    //this.http.get('http://localhost:3000/Searchyourfriend', {
    this.http.get('http://localhost:3000/SearchPeoples', {
      params: {
        srchkey: this.srfr
      }
    })
      .subscribe(data => {
        this.srfrlst = data;
      },
        err => console.log(err),
        () => console.log(this.srfrlst));
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
  getUserProfilePic(){
    this.http.get('http://localhost:3000/getUserProfilePic', {
      params: {
        uid: this.lgid,
      }
    })
      .subscribe(data => {
        this.lupic = "http://www.sarvaamexporters.com/" + data[0].pro_path;
      },
        err => console.log(err),
        () => console.log());
  }
  ngOnInit() {
    this.lgid = this.cookie.get('luser');
    this.lguser = this.cookie.get('luname');
    this.getUserChats();
    this.getUserProfilePic();
  }

}
