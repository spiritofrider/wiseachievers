import { LocationStrategy } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { CommonService } from "src/app/services/commonservice";
import * as moment from 'moment';
import { ReportComponent } from "../report/report.component";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
  userList: any = [];
  userListCopy: any = [];
  reportInfo: Object;
  graphInfo: Object;
  candidateFullName: string;
  @ViewChild(ReportComponent,{static:true}) reports: ReportComponent;
  constructor(
    private common: CommonService,
    private location: LocationStrategy,
    private commonService: CommonService
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {
    this.getAllUsersList();
  }

  getAllUsersList() {
    this.common.getAllUsers().subscribe(
      (user: any) => {
        this.userList = [...user].reverse();
        this.userList.forEach((user)=>{
          user['age'] = moment().diff(user['dob'],'years');
        });
        this.userListCopy = [...user].reverse();
        this.userListCopy.forEach((user)=>{
          user['age'] = moment().diff(user['dob'],'years');
        });
      },
      (error) => {
        this.common.snackBar(error.error, "s");
      }
    );
  }

  filteredData(changedUserData) {
    this.userList = changedUserData;
  }
  ActivateDeactivate(record, flag) {
    let body = {
      activateAccount: flag,
    };
    this.common.editUsers(record._id, body).subscribe(
      (e) => {
        let msg = flag ? "activated" : "deactivated";
        this.common.snackBar(`User successfully ${msg}`, "s");
      },
      (error) => {
        this.common.snackBar(error.error, "s");
      }
    );
  }

  viewReport(userId, fullName) {
    this.common.viewReport(userId).subscribe(
      (e) => {
        if (e) {
          this.reportInfo = e;
          this.candidateFullName = fullName;
        } else {
          this.common.snackBar(
            `The reports are not available for this user`,
            "a"
          );
        }
      },
      (error) => {
        this.common.snackBar(error.message, "s");
      }
    );
  }
  

  downloadAnswerSheet(classId:string) {
    this.commonService.exportAsPDF(classId);
  }

  viewGraph(user) {
    this.graphInfo = user;
  }
  goBack() {
    this.getAllUsersList();
    this.reportInfo = undefined;
    this.graphInfo = undefined;
  }
}
