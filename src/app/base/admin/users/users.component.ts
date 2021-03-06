import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/commonservice";

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
  constructor(
    private common: CommonService,
    private location: LocationStrategy
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
        this.userListCopy = [...user].reverse();
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

  viewGraph(user) {
    this.graphInfo = user;
  }
  goBack() {
    this.getAllUsersList();
    this.reportInfo = undefined;
    this.graphInfo = undefined;
  }
}
