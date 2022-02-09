import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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

  constructor(
    private testService: TestService,
    private router: Router,
    private storageService: StorageService,
    private common: CommonService,
    private route: ActivatedRoute
  ) {
    this.currentQuestion = 0;
  }

  ngOnInit() {
    this.common.updatedTestStatus.subscribe((status) => {
      this.statusObject = status;
      if (this.statusObject.length == 0) {
        const decryptCookie = this.common.tokenDecryption(
          this.storageService.getCookie("token")
        );
        this.testUserStatus(decryptCookie["_id"]);
      } else {
        this.routeParam = this.route.snapshot.paramMap.get("type");
        this.getTest1list(`test${this.routeParam}`);
      }
    });
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
    console.log(this.uniqueRelation);
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
      this.answerSheet.push(...this.answerSubmittedObj);
      this.currentQuestion = 0;
      this.answerSubmittedObj = [];
      this.storeTest();

      if (this.uniqueRelation.length > 1) {
        this.uniqueRelation.shift();
        this.submissionPart = false;
        this.TestQuiz = this.totalQuizQues.filter(
          (obj) => obj.relation == this.uniqueRelation[0]
        );
        this.relation = this.TestQuiz[0].relation;
      } else {
        this.router.navigate(["base/test"]);
      }
    } else {
      alert("Please answer all questions");
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
        console.log(e, "score submitted");
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
        let unique = [];
        res.forEach((element) => {
          unique.push(element.relation);
        });
        const decryptCookie = this.common.tokenDecryption(
          this.storageService.getCookie("token")
        );

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
    };
    return nameMapping[key];
  }

  RelationMapping(relation) {
    let partName;
    if (relation == "4") {
      partName = "1";
    }
    if (relation == "5") {
      partName = "2";
    }
    return partName;
  }
}
