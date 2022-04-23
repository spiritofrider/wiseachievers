import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/internal/Subscription";
import { CommonService } from "src/app/services/commonservice";
import { StorageService } from "src/app/services/storage.service";
import { TestService } from "../test.service";

@Component({
  selector: "app-test-screen",
  templateUrl: "./test-screen.component.html",
  styleUrls: ["./test-screen.component.scss"],
})
export class TestScreenComponent implements OnInit {
  submissionPart: boolean = true;
  mainTestObject: any = [];
  currentQuestion: number;
  TestQuiz: any;
  totalQuizQues: any;
  answerSubmittedObj: any;
  uniqueRelation: any = [];
  answerSheet: any = [];
  incrementBoxes: any[];
  relation: any;
  firstRelation: any;
  statusObject: any[];
  routeParam: string;
  statusObjectCopy: any[];

  templateArray: string[] = ["3", "4", "5", "6"]; //route param match for timer tests

  relationForRedirection: string[] = ["3", "5", "6", "7", "8", "9"];

  timeLeft: number;
  interval;

  decryptCookie: any;
  isAdmin: any;

  subscriptionTestStatus: Subscription;

  constructor(
    private testService: TestService,
    private router: Router,
    private storageService: StorageService,
    private common: CommonService,
    private route: ActivatedRoute
  ) {
    this.currentQuestion = 0;
    this.isAdmin =
      this.common.tokenDecryption(this.storageService.getCookie("token"))[
        "isAdmin"
      ] || false;
  }

  ngOnInit() {
    this.common.tokenDecryption(this.storageService.getCookie("token"))[
      "isAdmin"
    ];
    this.subscriptionTestStatus = this.common.updatedTestStatus.subscribe(
      (status) => {
        this.statusObject = status;
        if (this.statusObject.length == 0) {
          this.decryptCookie = this.common.tokenDecryption(
            this.storageService.getCookie("token")
          );
          this.testUserStatus(this.decryptCookie["_id"]);
        } else {
          this.routeParam = this.route.snapshot.paramMap.get("type");
          this.getTest1list(`test${this.routeParam}`);
        }
      }
    );
  }

  ngOnChanges() {
    this.isAdmin =
      this.common.tokenDecryption(this.storageService.getCookie("token"))[
        "isAdmin"
      ] || false;
  }

  ngOnDestroy() {
    this.subscriptionTestStatus.unsubscribe();
  }

  testUserStatus(userId) {
    this.common.testUserStatus(userId).subscribe(
      (e: any[]) => {
        this.statusObject = e;
        this.routeParam = this.route.snapshot.paramMap.get("type");
        this.getTest1list(`test${this.routeParam}`);
      },
      (error) => {
        this.common.snackBar("There is some issue in fetching the tests", "");
      }
    );
  }

  traverseTest(testNo) {
    this.currentQuestion = 0;
    const test =
      testNo[0] == "next"
        ? (+testNo[1] + 1).toString()
        : (+testNo[1] - 1).toString();
    this.TestQuiz = this.totalQuizQues.filter((obj) => obj.relation == test);
    testNo[0] == "next"
      ? this.uniqueRelation.shift()
      : this.uniqueRelation.unshift((+testNo[1] - 1).toString()); // need to check for prev
    this.relation = this.TestQuiz[0].relation;
    this.submissionPart = false;
  }

  questionIncremented(qno) {
    this.currentQuestion = qno;
  }

  finalObjReturned(obj) {
    this.answerSubmittedObj = obj;
  }

  submitExampleTest(test) {
    if (
      this.answerSubmittedObj?.length > 0 &&
      Object.values(this.answerSubmittedObj).every((v) =>
        Object.values(v).every((val) => val)
      ) &&
      this.answerSubmittedObj.length == this.TestQuiz.length
    ) {
      this.answerSubmittedObj = this.answerSubmittedObj.sort((a, b) =>
        Number(a["id"] - Number(b["id"]))
      );
      this.answerSheet.push(...this.answerSubmittedObj);
      this.currentQuestion = 0;
      this.answerSubmittedObj = [];
      this.storeTest();

      /* else {
        this.router.navigate(["base/test"]);
      } */
    } else {
      let testObArr = [];
      let answeredObArr = [];
      this.TestQuiz.forEach((ob) => {
        testObArr.push(Number(ob["qno"]));
      });
      this.answerSubmittedObj.forEach((ob) => {
        answeredObArr.push(Number(ob["id"]));
      });
      alert(
        `Please answer questions ${String(
          testObArr.filter((x) => !answeredObArr.includes(x))
        )} to submit the test.`
      );
    }
  }
  submitTimerBasedTest() {
    this.pauseTimer();
    console.log("heree trouble", this.answerSubmittedObj);
    if (this.answerSubmittedObj) {
      if (this.answerSubmittedObj?.length > 0) {
        this.answerSubmittedObj = this.answerSubmittedObj.sort((a, b) =>
          Number(a["id"] - Number(b["id"]))
        );
        this.answerSheet.push(...this.answerSubmittedObj);
        this.currentQuestion = 0;
        this.answerSubmittedObj = [];
        this.storeTest();
      }
    }
  }

  storeTest() {
    const decryptCookie = this.common.tokenDecryption(
      this.storageService.getCookie("token")
    );
    let body = this.payloadForTest(decryptCookie);
    this.testService.storeTestApi(body).subscribe(
      (e) => {
        this.answerSheet = [];
        if (this.relationForRedirection.includes(this.relation)) {
          this.router.navigate(["base/test"]);
        }
        if (this.uniqueRelation.length > 1) {
          this.uniqueRelation.shift();
          this.submissionPart = false;
          this.TestQuiz = this.totalQuizQues.filter(
            (obj) => obj.relation == this.uniqueRelation[0]
          );
          this.relation = this.TestQuiz[0].relation;
        }
      },
      (error) => {
        this.common.snackBar(error.message, "a");
        this.router.navigate(["base/test"]);
      }
    );
  }

  payloadForTest(cookieVal) {
    const testkey = `test${this.relation}`;
    return {
      [testkey]: {
        info: this.answerSheet,
      },
      userId: cookieVal["_id"],
      testType: testkey,
    };
  }

  getTest1list(testNo) {
    this.testService.getTest1Questionlist(testNo).subscribe(
      (res: any) => {
        this.totalQuizQues = res;
        const decryptCookie = this.common.tokenDecryption(
          this.storageService.getCookie("token")
        );
        //start timer when quiz is loaded
        if (
          this.templateArray.includes(
            this.route.snapshot.paramMap.get("type")
          ) &&
          !decryptCookie["isAdmin"]
        ) {
          this.startTimer();
        }
        let unique = [];
        res.forEach((element) => {
          unique.push(element.relation);
        });

        let uniqueList = [...new Set(unique)];
        !decryptCookie["isAdmin"]
          ? uniqueList.forEach((keys) => {
              if (this.statusObject[`test_${keys}`]?.completed != true) {
                this.uniqueRelation.push(keys);
              }
            })
          : (this.uniqueRelation = uniqueList);
        this.firstRelation = this.uniqueRelation[0];
        this.TestQuiz = res.filter(
          (obj) => obj.relation == this.uniqueRelation[0]
        );
        this.relation = this.TestQuiz[0].relation;
        this.currentQuestion = 0;
      },
      (error) => {
        this.common.snackBar(error.message, "a");
        this.router.navigate(["base/test"]);
      }
    );
  }

  TestName(key) {
    const nameMapping = {
      "1": "Career Interest Profiler",
      "2": "Personality Profiler",
      "3": "Numerical Reasoning.",
      "4": "English Aptitude.",
      "5": "Mechanical Aptitude.",
      "6": "Visual Spatial Test",
    };
    return nameMapping[key];
  }

  RelationMapping(relation) {
    let partName;
    switch (relation) {
      case "1":
        partName = ": Part 1";
        break;
      case "2":
        partName = ": Part 2";
        break;
      case "3":
        partName = ": Part 3";
        break;
      case "4":
        partName = ": Part 1";
        break;
      case "5":
        partName = ": Part 2";
        break;
      default:
        "";
    }

    return partName;
  }

  /* Timer  */

  startTimer() {
    this.timeLeft = this.getTimerValue(
      this.route.snapshot.paramMap.get("type")
    );
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.router.navigate(["base/test"]);
        this.pauseTimer();
        this.submitTimerBasedTest();
      }
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  formatTime(s) {
    return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
  }

  getTimerValue(routeParam) {
    const timerObject = {
      "3": 25 * 60,
      "4": 10 * 60,
      "5": 20 * 60,
      "6": 30 * 60,
    };
    return timerObject[routeParam];
  }
}
