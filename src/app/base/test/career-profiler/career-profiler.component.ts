import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/commonservice";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "app-career-profiler",
  templateUrl: "./career-profiler.component.html",
  styleUrls: ["./career-profiler.component.scss"],
})
export class CareerProfilerComponent implements OnInit {
  @Input() TestQuiz;
  @Input() submissionPart;
  @Input() TestType;
  @Input() firstRelation;
  @Output() questionIncrement = new EventEmitter();
  @Output() finalObj = new EventEmitter();
  @Output() submitExampleTestEmitter = new EventEmitter();
  @Output() traverseTestEmitter = new EventEmitter();

  mainTestObject: any = [];
  currentQuestion: any = 0;
  testHtmlAr = ["3", "4"];

  preferenceObject: any = {
    id: "",
    question: "",
    FirstPreferance: "",
    SecondPreferance: "",
    ThirdPreferance: "",
    FirstPreferanceIndex: null,
    SecondPreferanceIndex: null,
    ThirdPreferanceIndex: null,
    FirstPreferanceOption: "",
    SecondPreferanceOption: "",
    ThirdPreferanceOption: "",
  };

  choiceObjectTest3: any = {
    id: "",
    question: "",
    selected: "",
    category: "",
    value: "",
  };
  isAdmin: any;
  constructor(
    private storageService: StorageService,
    private common: CommonService,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log(this.TestType, this.TestType == "4", this.TestType != "4");
  }

  ngOnChanges() {
    this.isAdmin = this.common.tokenDecryption(
      this.storageService.getCookie("token")
    )["isAdmin"];
    if (!this.submissionPart) {
      this.resetPreferenceObject();
      this.currentQuestion = 0;
      this.mainTestObject = [];
    }
  }

  travesingPart(testType) {
    this.traverseTestEmitter.emit([testType, this.TestType]);
  }
  goToMainScreen() {
    this.router.navigate(["base/test"]);
  }

  nextQuestion() {
    if (this.currentQuestion < this.TestQuiz.length - 1) {
      this.currentQuestion += 1;
      this.CheckBoxLogicCommon();
    }
  }

  prevQues() {
    if (this.currentQuestion > 0) {
      this.currentQuestion -= 1;
    }
    this.CheckBoxLogicCommon();
  }

  submitExampleTest() {
    this.TestType == "3" ? this.finalObj.emit(this.mainTestObject) : "";
    this.submitExampleTestEmitter.emit("test");
  }

  CheckBoxLogicCommon() {
    this.resetPreferenceObject();
    this.questionIncrement.emit(this.currentQuestion);
    const filledQues = this.mainTestObject.find(
      (e) => e.id == this.TestQuiz[this.currentQuestion].qno
    );
    if (filledQues) {
      setTimeout(() => {
        if (filledQues["FirstPreferanceIndex"]) {
          document.getElementById(`f${filledQues["FirstPreferanceIndex"]}`)[
            "checked"
          ] = true;
        }
        if (filledQues["SecondPreferanceIndex"]) {
          document.getElementById(`s${filledQues["SecondPreferanceIndex"]}`)[
            "checked"
          ] = true;
        }
        if (filledQues["ThirdPreferanceIndex"]) {
          document.getElementById(`t${filledQues["ThirdPreferanceIndex"]}`)[
            "checked"
          ] = true;
        }
      }, 0);
    }
  }

  //for test for relation '3'
  choiceSelected(e, qno, question, category, value) {
    this.choiceObjectTest3["id"] = qno;
    this.choiceObjectTest3["question"] = question;
    this.choiceObjectTest3["category"] = category;
    this.choiceObjectTest3["value"] = value;
    this.choiceObjectTest3["selected"] = e["target"]["defaultValue"];
    let filledQues = this.mainTestObject.filter((e) => e["id"] == qno);
    if (filledQues.length < 1) {
      this.mainTestObject.push(this.choiceObjectTest3);
    } else {
      const Index = this.mainTestObject.findIndex((e) => e.id == qno);
      this.mainTestObject[Index]["value"] = this.choiceObjectTest3["value"];
      this.mainTestObject[Index]["selected"] = e["target"]["defaultValue"];
      console.log("mainObj", this.mainTestObject);
    }
    this.resetChoiceObject();
  }

  preferenceSelection(type, e: any, index, option) {
    const filledQues = this.mainTestObject.find(
      (e) => e["id"] == this.TestQuiz[this.currentQuestion].qno
    );
    if (filledQues) {
      this.preferenceObject = filledQues;
    }
    this.preferenceObject["question"] =
      this.TestQuiz[this.currentQuestion].question;
    this.preferenceObject["id"] = this.TestQuiz[this.currentQuestion].qno;
    if (type == "First") {
      this.radioButtonCheckLogic(
        type,
        "Second",
        "Third",
        index,
        e,
        option,
        "f"
      );
    } else if (type == "Second") {
      this.radioButtonCheckLogic(type, "First", "Third", index, e, option, "s");
    } else if (type == "Third") {
      this.radioButtonCheckLogic(
        type,
        "First",
        "Second",
        index,
        e,
        option,
        "t"
      );
    }

    if (Object.values(this.preferenceObject).every((v) => v)) {
      let filledQues = this.mainTestObject.filter(
        (e) => e["id"] == this.TestQuiz[this.currentQuestion].qno
      );
      if (filledQues.length < 1) {
        this.mainTestObject.push(this.preferenceObject);
      } else {
        this.mainTestObject.map(
          (obj) => filledQues.find((o) => o.id === obj.id) || obj
        );
      }
    }
    this.finalObj.emit(this.mainTestObject);
  }

  resetPreferenceObject() {
    this.preferenceObject = {
      id: "",
      question: "",
      FirstPreferance: "",
      SecondPreferance: "",
      ThirdPreferance: "",
      FirstPreferanceIndex: null,
      SecondPreferanceIndex: null,
      ThirdPreferanceIndex: null,
      FirstPreferanceOption: "",
      SecondPreferanceOption: "",
      ThirdPreferanceOption: "",
    };
  }
  resetChoiceObject() {
    this.choiceObjectTest3 = {
      id: "",
      question: "",
      selected: "",
      category: "",
      value: "",
    };
  }

  radioButtonCheckLogic(
    prefType,
    prefType2nd,
    prefType3rd,
    index,
    e,
    option,
    id
  ) {
    if (!!this.preferenceObject[`${prefType}PreferanceIndex`]) {
      document.getElementById(
        `${id}${this.preferenceObject[`${prefType}PreferanceIndex`]}`
      )["checked"] = false;
    }
    if (this.preferenceObject[`${prefType2nd}PreferanceIndex`] == index) {
      this.preferenceObject[`${prefType2nd}PreferanceIndex`] = null;
    }
    if (this.preferenceObject[`${prefType3rd}PreferanceIndex`] == index) {
      this.preferenceObject[`${prefType3rd}PreferanceIndex`] = null;
    }
    this.preferenceObject[`${prefType}PreferanceIndex`] = index;
    this.preferenceObject[`${prefType}Preferance`] =
      e["target"]["defaultValue"];
    this.preferenceObject[`${prefType}PreferanceOption`] = option;
  }
}
