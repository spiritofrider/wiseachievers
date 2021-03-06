import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BsModalService } from "ngx-bootstrap/modal";
import { CommonService } from "src/app/services/commonservice";
import { StorageService } from "src/app/services/storage.service";
import { InstructionModalComponent } from "src/app/shared/common/instruction-modal/instruction-modal.component";

@Component({
  selector: "app-test",
  templateUrl: "./test.component.html",
  styleUrls: ["./test.component.scss"],
})
export class TestComponent implements OnInit {
  bsModalRef: any;
  statusObject: Object;

  constructor(
    private router: Router,
    private BsModalService: BsModalService,
    private common: CommonService,
    private storageService: StorageService,
    private location: LocationStrategy
  ) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit() {
    const decryptCookie = this.common.tokenDecryption(
      this.storageService.getCookie("token")
    );
    decryptCookie["isAdmin"]
      ? (this.testUserStatus = Object)
      : this.testUserStatus(decryptCookie["_id"]);
  }

  TestSelection(attri, routeParam, subattri1?, subattri2?) {
    const condition =
      this.statusObject?.[attri].completed !== true ||
      this.statusObject?.[subattri1].completed !== true ||
      this.statusObject?.[subattri2].completed !== true;

    if (condition) {
      this.bsModalRef = this.BsModalService.show(InstructionModalComponent, {
        backdrop: "static",
        keyboard: false,
        initialState: {
          typeOfTest:
            routeParam == "1" || routeParam == "2" ? "non-timer" : "timer",
          timerValue: this.getTimerValue(routeParam),
        },
      });

      let subsciber = this.BsModalService.onHide.subscribe((res) => {
        let action = this.bsModalRef.content.action;
        if (action == "ok") {
          subsciber.unsubscribe();
          this.router.navigate(["base/test/" + routeParam]);
        }
      });
    }
  }

  getTimerValue(routeParam) {
    const timerObject = {
      "3": 25,
      "4": 10,
      "5": 20,
      "6": 30,
    };
    return timerObject[routeParam];
  }

  testUserStatus(userId) {
    this.common.testUserStatus(userId).subscribe(
      (e) => {
        this.statusObject = e;
        this.common.updateData(this.statusObject, "testStatus");
      },
      (error) => {
        this.common.snackBar("There is some issue in fetching the tests", "");
      }
    );
  }

  disablingClass(testName) {
    return this.common.tokenDecryption(this.storageService.getCookie("token"))[
      "isAdmin"
    ]
      ? false
      : this.commonDisableLogic(testName);
  }

  commonDisableLogic(type) {
    const mapping = {
      career: ["test_1", "test_2", "test_3"],
      personality: ["test_4", "test_5"],
      numeric: ["test_6"],
      english: ["test_7"],
      mechanical: ["test_8"],
      visual: ["test_9"],
    };
    const isSubmitted = (element) =>
      this.statusObject?.[element]?.completed == true;
    const isDisabled = mapping[type].every(isSubmitted);
    return isDisabled;
  }
}
