import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { CommonService } from "src/app/services/commonservice";
import { StorageService } from "src/app/services/storage.service";

@Component({
  selector: "timer-based-test",
  templateUrl: "./timer-based-test.component.html",
  styleUrls: ["../career-profiler/career-profiler.component.scss"],
})
export class TimerBasedTestComponent implements OnInit {
  @Input() TestQuiz;
  @Input() submissionPart;
  @Input() TestType;
  @Input() firstRelation;
  @Output() questionIncrement = new EventEmitter();
  @Output() finalObj = new EventEmitter();
  @Output() submitExampleTestEmitter1 = new EventEmitter();
  @Output() traverseTestEmitter = new EventEmitter();

  mainTestObject: any = [];
  currentQuestion: any = 0;

  choiceObject: any = {
    id: "",
    question: "",
    selected: "",
    value: "",
  };
  isAdmin: any;
  constructor(
    private router: Router,
    private common: CommonService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isAdmin =
      this.common.tokenDecryption(this.storageService.getCookie("token"))[
        "isAdmin"
      ] || false;
  }

  ngOnChanges() {
    this.isAdmin =
      this.common.tokenDecryption(this.storageService.getCookie("token"))[
        "isAdmin"
      ] || false;
    if (!this.submissionPart) {
      this.currentQuestion = 0;
      this.mainTestObject = [];
    }
  }

  goToMainScreen() {
    this.router.navigate(["base/test"]);
  }

  submitTest() {
    this.finalObj.emit(this.mainTestObject);

    this.submitExampleTestEmitter1.emit("test");
  }

  optionSelected(e, qno, question, value) {
    this.choiceObject["id"] = qno;
    this.choiceObject["question"] = question;
    this.choiceObject["value"] =
      e["target"]["defaultValue"] == "true" ? true : false;
    this.choiceObject["selected"] = value;
    let filledQues = this.mainTestObject.filter((e) => e["id"] == qno);
    if (filledQues.length < 1) {
      this.mainTestObject.push(this.choiceObject);
    } else {
      const Index = this.mainTestObject.findIndex((e) => e.id == qno);
      this.mainTestObject[Index]["value"] = this.choiceObject["value"];
      this.mainTestObject[Index]["selected"] = e["target"]["defaultValue"];
    }
    this.finalObj.emit(this.mainTestObject);
    this.resetChoiceObject();
  }

  resetChoiceObject() {
    this.choiceObject = {
      id: "",
      question: "",
      selected: "",
      value: "",
    };
  }

  AssetLocation(img) {
    let location = `../assets/images/${img}`;
    const assetLoc = img == "i7" ? location + ".jpg" : location + ".PNG";
    return assetLoc;
  }

  widthAdjustment(imageName) {
    let imagesToFix = ["i1", "i5", "i7", "i28"];
    if (imagesToFix.includes(imageName)) {
      return "200px";
    }
    if (imageName == "i3") {
      return "300px";
    }
    let spatialImages500 = [
      "i22",
      "i23",
      "i24",
      "i25",
      "i26",
      "i27",
      "i30",
      "i35",
      "i36",
    ];
    if (spatialImages500.includes(imageName)) {
      return "500px";
    }
    const spatialImages400 = ["i30", "i31"];
    if (spatialImages400.includes(imageName)) {
      return "350px";
    }
  }

  numericalQuestionFormatting(question: string, qno) {
    if (question.includes(":")) {
      const seperatedByColon = question.split(":");
      document.getElementById(qno).style.wordSpacing = "8px";
      return (
        seperatedByColon[0] +
        ":" +
        "\n" +
        "<br>" +
        `${"&nbsp"}${"&nbsp"}${seperatedByColon[1]}`
      );
    } else {
      return question;
    }
  }
}
