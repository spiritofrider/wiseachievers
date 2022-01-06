import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import { CommonService } from 'src/app/services/commonservice';
import { StorageService } from 'src/app/services/storage.service';
import { LoginComponent } from 'src/app/shared/common/login/login.component';
import { SignupComponent } from 'src/app/shared/common/signup/signup.component';

@Component({
  selector: 'app-top-layout',
  templateUrl: './top-layout.component.html',
  styleUrls: ['./top-layout.component.scss']
})
export class TopLayoutComponent implements OnInit {
  bsModalRef: any;
  username : any ;
  token : any;

  constructor(private BsModalService:BsModalService,private storageService:StorageService,private route:Router,
    private common : CommonService) { }

  ngOnInit(): void {
    this.username = this.common.tokenDecryption(this.storageService.getCookie('token'))['fullName']
    this.token = this.storageService.getCookie('token')
  }
  openLoginModal(){
    this.bsModalRef = this.BsModalService.show(LoginComponent,{
      backdrop : 'static',
      keyboard: false
    })

  let loginSubscriber = this.BsModalService.onHide.subscribe(res=>{
    let username = this.bsModalRef.content.username
    if(username){
      loginSubscriber.unsubscribe();
      this.username = username;
      this.token = this.storageService.getCookie('token')
    }
  })
  }

  logout(){
    this.storageService.clearAllCookie()
    this.token = undefined;
    this.route.navigate(['home'])
  }

  openSignupModal(){
    this.bsModalRef = this.BsModalService.show(SignupComponent,{
      backdrop : 'static',
      keyboard: false
    })
  }

}
