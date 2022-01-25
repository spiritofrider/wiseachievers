import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PagerService } from "src/app/services/pager.service";
import { TestService } from "../test.service";

@Component({
  selector: "app-test-screen",
  templateUrl: "./test-screen.component.html",
  styleUrls: ["./test-screen.component.scss"],
})
export class TestScreenComponent implements OnInit {
  preferenceObject: any = {
    question: "",
    FirstPreferance: "",
    SecondPreferance: "",
    ThirdPreferance: "",
    FirstPreferanceIndex: null,
    SecondPreferanceIndex: null,
    ThirdPreferanceIndex: null,
  };
  submissionPart: boolean = true;
  mainTestObject: any = [];
  currentQuestion: number;
  TestQuiz: any;
  totalQuizQues: any;
  answerSubmittedObj: any;
  uniqueRelation: any;
  answerSheet: any = [];
  incrementBoxes: any[];
  indexAr: any[];
  currentPage: number = 1;
  PaginationControl: any = {
    ques: 0,
    boolVal: false,
  };

  constructor(
    private testService: TestService,
    private router: Router,
    private pagerService: PagerService
  ) {
    this.currentQuestion = 0;
  }

  ngOnInit() {
    this.getTest1list();
    //this.TestQuiz = this.testExample.getExampleTest();
  }

  questionIncremented(qno) {
    console.log("emit freq", qno);
    this.currentQuestion = qno;
    this.PaginationControl.ques = qno;

    this.boxPaginationLogic();
  }

  finalObjReturned(obj) {
    console.log("emitting result", obj);
    const avail = obj.find(
      (e) => e["id"] == this.TestQuiz[this.currentQuestion].qno
    );
    if (avail && Object.values(avail).every((v) => v)) {
      document.getElementById(
        `b${this.currentQuestion}`
      ).style.backgroundColor = "#0081d6";
      document.getElementById(`b${this.currentQuestion}`).style.color = "white";
    } else {
      document.getElementById(
        `b${this.currentQuestion}`
      ).style.backgroundColor = "#ffffff";
      document.getElementById(`b${this.currentQuestion}`).style.color = "black";
    }
    this.answerSubmittedObj = obj;
  }

  submitExampleTest() {
    if (
      this.answerSubmittedObj?.length > 0 &&
      Object.values(this.answerSubmittedObj).every((v) =>
        Object.values(v).every((val) => val)
      ) &&
      this.answerSubmittedObj.length == this.TestQuiz.length
    ) {
      console.log("submitted!");
      this.answerSheet.push(...this.answerSubmittedObj);
      this.currentQuestion = 0;
      this.answerSubmittedObj = [];
      if (this.uniqueRelation.length > 1) {
        this.uniqueRelation.shift();
        this.submissionPart = false;
        this.TestQuiz = this.totalQuizQues.filter(
          (obj) => obj.relation == this.uniqueRelation[0]
        );
        if (this.TestQuiz.length > 4) {
          this.boxPaginationLogic();
        }
      } else {
        this.router.navigate(["base/test"]);
      }
    } else {
      alert("Please answer all questions");
    }
  }

  getTest1list() {
    this.testService.getTest1Questionlist().subscribe((res: any) => {
      this.totalQuizQues = res;
      let unique = [];
      res.forEach((element) => {
        unique.push(element.relation);
      });
      this.uniqueRelation = [...new Set(unique)];
      this.TestQuiz = res.filter(
        (obj) => obj.relation == this.uniqueRelation[0]
      );
      this.currentQuestion = 0;
      if (this.TestQuiz.length > 4) {
        this.boxPaginationLogic();
        console.log(this.incrementBoxes);
      }
    });
  }

  boxPaginationLogic() {
    let boxAr = Array.from(Array(this.TestQuiz.length).keys());
    this.indexAr = [...boxAr];
    let incrementCopy;
    if (this.incrementBoxes) {
      incrementCopy = [...this.incrementBoxes];
    }
    console.log(
      "incrementBoxValue at currentQuestion",
      this.currentQuestion,
      ":",
      incrementCopy
    );

    //Totalpage —>  6
    //Peerage -> 3
    /*  let pageSize = 3;
    let totalPages = Math.ceil(boxAr.length / pageSize);
    let Pages = totalPages / pageSize; //number of pages
    this.currentPage;
    Pages = this.currentQuestion == 0 ? 0 : (boxAr.length / this.currentQuestion;
    console.log("pages", Pages);
    let startIndex = Pages * pageSize;
    let endIndex = Math.min(startIndex + pageSize, boxAr.length);
    console.log(startIndex,endIndex);
    this.incrementBoxes = this.indexAr.slice(this.currentQuestion, endIndex);
    console.log(this.incrementBoxes); */
    if (incrementCopy?.[0] == this.currentQuestion) {
      console.log("clicked previous", this.currentQuestion);
      let startIndex =
        this.currentQuestion - 4 < 0 ? this.currentQuestion - 4 : 0;
      this.incrementBoxes = this.indexAr.slice(
        startIndex,
        this.currentQuestion
      );
      console.log(
        "incrementBoxValue at currentQuestion,firstlogic",
        this.currentQuestion,
        ":",
        this.incrementBoxes
      );
    } else {
      console.log("clicked next", this.currentQuestion);

      let endIndex =
        this.currentQuestion == boxAr.length
          ? boxAr.length
          : this.currentQuestion + 4;
      this.incrementBoxes = this.indexAr.slice(this.currentQuestion, endIndex);
      console.log(
        "incrementBoxValue at currentQuestion,lastlogic",
        this.currentQuestion,
        ":",
        this.incrementBoxes
      );
    }
    console.log(this.answerSubmittedObj);
    this.answerSubmittedObj?.forEach((element) => {
      console.log(this.incrementBoxes.includes(element["id"]));
      if (this.incrementBoxes.includes(parseInt(element["id"]) - 1)) {
        document.getElementById(
          `b${parseInt(element["id"]) - 1}`
        ).style.backgroundColor = "#0081d6";
        document.getElementById(`b${element.id}`).style.color = "white";
      }
    });
  }

  /*   setPage(page: number) {    this.pager = {}    
  if (this.allItems.length > 0) {      // get pager object from service     
     this.pager = this.pagerService.getPager(this.allItems.length, page);     
      // get current page of items     
       this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);    }  } */
}
