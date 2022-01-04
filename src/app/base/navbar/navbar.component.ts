import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Location} from '@angular/common'

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  route:string

  constructor(private router:Router,private location:Location) {
    router.events.subscribe(e=>{
      if(location.path() != ""){
        this.route = location.path();
      }
      else{
        this.route = "home"
      }
    })
   }

  ngOnInit() {
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

}
