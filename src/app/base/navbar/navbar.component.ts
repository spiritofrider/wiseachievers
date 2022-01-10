import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { StorageService } from 'src/app/services/storage.service';
import { CommonService } from 'src/app/services/commonservice';
import { Subscription } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/shared/common/login/login.component';
import { SignupComponent } from 'src/app/shared/common/signup/signup.component';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  route:string;
  admin : any;
  isActive : any;
  subscription: Subscription;
  activeSubscription:Subscription;
  bsModalRef: any;
  token: any;
  username: any;

  constructor(private router:Router,private location:Location,private storageService:StorageService,
    private common:CommonService,private BsModalService:BsModalService) {
    router.events.subscribe(e=>{
      if(location.path() != ""){
        this.route = location.path();
      }
      else{
        this.route = this.admin ? "admin" : "home"
        
      }
    })
   }

  ngOnInit() {
    this.token = this.storageService.getCookie('token')
    this.username = this.common.tokenDecryption(this.storageService.getCookie('token'))['fullName'];
    this.admin = this.common.tokenDecryption(this.storageService.getCookie('token'))['isAdmin']
    this.isActive = this.common.tokenDecryption(this.storageService.getCookie('token'))['activateAccount']
  }

  getActiveRoutes(route:any){
    let isRoute: boolean = false;
    
    if(route){
      if(this.route.indexOf(route) > -1){
        isRoute = true;
      }
      else{
        isRoute = false;
      }
    }

    return isRoute;

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
        this.username = this.common.tokenDecryption(this.storageService.getCookie('token'))['fullName'];
        this.token = this.storageService.getCookie('token')
        this.admin = this.common.tokenDecryption(this.storageService.getCookie('token'))['isAdmin']
    this.isActive = this.common.tokenDecryption(this.storageService.getCookie('token'))['activateAccount']
      }
    })
    }
  
    logout(){
      this.storageService.clearAllCookie()
      this.token = undefined;
      this.admin = this.common.tokenDecryption(this.storageService.getCookie('token'))['isAdmin']
    this.isActive = this.common.tokenDecryption(this.storageService.getCookie('token'))['activateAccount']
      this.router.navigate(['base/home'])
    }
  
    openSignupModal(){
      this.bsModalRef = this.BsModalService.show(SignupComponent,{
        backdrop : 'static',
        keyboard: false
      })
    }
}
