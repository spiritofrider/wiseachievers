import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/services/commonservice';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  userList:any = [];
  userListCopy:any = [];
  constructor(private common : CommonService) { }

  ngOnInit(): void {
    this.getAllUsersList()
  }

  getAllUsersList(){
    this.common.getAllUsers().subscribe(user =>{
      this.userList = user;
      this.userListCopy = user;
    })
  }

  filteredData(changedUserData){
    this.userList = changedUserData;
  }

  ActivateDeactivate(record,flag){
console.log(record,flag)
let body = {
  "activateAccount": flag
}
this.common.editUsers(record._id,body).subscribe(e =>{
  console.log(e)
})
  }

}
