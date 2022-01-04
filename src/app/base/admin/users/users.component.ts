import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonservice';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(private common : CommonService) { }

  ngOnInit(): void {
    this.getAllUsersList()
  }

  getAllUsersList(){
    this.common.getAllUsers().subscribe(user =>{
      console.log(user)
    })
  }

}
