import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'
import { StorageService } from 'src/app/services/storage.service';
import { CommonService } from 'src/app/services/commonservice';
import { Subscription } from 'rxjs';

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

  constructor(private router:Router,private location:Location,private storageService:StorageService,private common:CommonService) {
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
    this.admin = this.storageService.getCookie('isAdmin')
    this.isActive = this.storageService.getCookie('isActive')
  }

  getActiveRoutes(route:any){
    let isRoute: boolean = false;
    this.admin = this.storageService.getCookie('isAdmin')
    this.isActive = this.storageService.getCookie('isActive')
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

}
