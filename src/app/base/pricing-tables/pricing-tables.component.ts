import { Component, OnInit } from '@angular/core';
import { SignupComponent } from 'src/app/shared/common/signup/signup.component';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pricing-tables',
  templateUrl: './pricing-tables.component.html',
  styleUrls: ['./pricing-tables.component.scss']
})
export class PricingTablesComponent implements OnInit {

  bsModalRef:any;

  constructor(private BsModalService:BsModalService) { }

  ngOnInit(): void {
  }

  openSignupModal(){
    this.bsModalRef = this.BsModalService.show(SignupComponent,{
      backdrop : 'static',
      keyboard: false
    })
  }

}
