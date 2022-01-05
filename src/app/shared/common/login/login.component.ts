import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/services/commonservice';
import {BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginForm: FormGroup;
  constructor(private common:CommonService,private BsModalService:BsModalService) { 
    this.loginForm = new FormGroup({
      email : new FormControl('',[Validators.required]),
      password : new FormControl('',[Validators.required])
    })
  }

  ngOnInit(): void {
  }

  submitForm(formVal){
    console.log(formVal)
    this.common.loginUser(formVal).subscribe(e=>{
      console.log(e)
    })

  }

  Cancel(){
    this.BsModalService.hide()
  }

}
