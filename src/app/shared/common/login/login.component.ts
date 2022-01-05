import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonservice';
import {BsModalService} from 'ngx-bootstrap/modal';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
  username: string;
  constructor(private common:CommonService,private BsModalService:BsModalService,
    private storageService:StorageService,private route:Router) { 
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  submitForm(formVal){
    this.common.loginUser(formVal).subscribe(e=>{
      this.username = e['fullName']
      this.storageService.setCookie('token',e['token'])
      this.storageService.setCookie('username',e['fullName'])
      if(e.hasOwnProperty('isAdmin')){
        this.storageService.setCookie('isAdmin',e['isAdmin'])
        this.route.navigate(['base/admin'])
      }
      this.Cancel()
      this.common.snackBar('Login successful','s')
    },(error)=>{
      this.common.snackBar(error.error,'s')
    })

  }

  Cancel(){
    this.BsModalService.hide()
  }

   
}
