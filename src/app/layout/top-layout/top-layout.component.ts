import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import { LoginComponent } from 'src/app/shared/common/login/login.component';

@Component({
  selector: 'app-top-layout',
  templateUrl: './top-layout.component.html',
  styleUrls: ['./top-layout.component.scss']
})
export class TopLayoutComponent implements OnInit {
  bsModalRef: any;

  constructor(private BsModalService:BsModalService) { }

  ngOnInit(): void {
  }
  openLoginModal(){
    this.bsModalRef = this.BsModalService.show(LoginComponent,{
      backdrop : 'static',
      keyboard: false
    })
  }

}
