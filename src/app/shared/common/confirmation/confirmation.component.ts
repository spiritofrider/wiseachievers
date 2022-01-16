import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss']
})
export class ConfirmationComponent implements OnInit {

  constructor(private BsModalService:BsModalService) { }

  ngOnInit(): void {
  }


  Cancel(){
    this.BsModalService.hide()
  }

}
