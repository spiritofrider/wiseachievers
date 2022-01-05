import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private bsModalService:BsModalService) { }

  ngOnInit(): void {
  }

  CancelModal(){
    this.bsModalService.hide()
  }

}
