import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CommonService } from 'src/app/services/commonservice';
import { ExampleTestService } from 'src/app/services/example-test.service';
import { TestService } from '../test.service';

@Component({
  selector: 'app-test-screen',
  templateUrl: './test-screen.component.html',
  styleUrls: ['./test-screen.component.scss']
})
export class TestScreenComponent implements OnInit {

  totalQuestion : any = [0,1,2,3,4,5,6,7,8]; //to be received from backend
  preferenceObject : any = {
    'question' : '',
    'FirstPreferance' : '',
    'SecondPreferance' : '',
    'ThirdPreferance' : '',
    'FirstPreferanceIndex' : null,
    'SecondPreferanceIndex':null,
    'ThirdPreferanceIndex': null
  };
  submissionPart: boolean = true;
  mainTestObject : any = [];
  currentQuestion: number;
  TestQuiz: any;
  totalQuizQues: any;
  answerSubmittedObj: any;
  uniqueRelation: any;
  answerSheet: any = [];


  constructor(private testExample: ExampleTestService,private sharedService: CommonService,private testService:TestService,private router:Router) {  this.currentQuestion = 0;}

  ngOnInit() {
    this.getTest1list()
    //this.TestQuiz = this.testExample.getExampleTest();
  }


  questionIncremented(qno){
    this.currentQuestion = qno;
  }

  finalObjReturned(obj){
    const avail = obj.find((e=> e['id'] == this.TestQuiz[this.currentQuestion].qno))
    if(avail && Object.values(avail).every(v => v) ){  document.getElementById(`b${this.currentQuestion}`).style.backgroundColor = '#0081d6'
    document.getElementById(`b${this.currentQuestion}`).style.color = 'white'}
    else{
      document.getElementById(`b${this.currentQuestion}`).style.backgroundColor = '#ffffff'
      document.getElementById(`b${this.currentQuestion}`).style.color = 'black' 
    }
    this.answerSubmittedObj = obj;
  }



  submitExampleTest(){
    console.log(this.uniqueRelation)
    console.log(this.answerSheet)
    if(Object.values(this.answerSubmittedObj).every(v => Object.values(v).every(val => val)) && this.answerSubmittedObj.length == this.TestQuiz.length){
      console.log("submitted!")
      this.answerSheet.push(...this.answerSubmittedObj)
      this.currentQuestion = 0;
      this.answerSubmittedObj = []
      if(this.uniqueRelation.length > 1){
      this.uniqueRelation.shift()
      this.submissionPart = false;
      this.TestQuiz = this.totalQuizQues.filter(obj => obj.relation == this.uniqueRelation[0])}
      else{
        this.router.navigate(['base/test'])}
    }
    else{
      alert("Please answer all questions")
    }
   
  }



  getTest1list(){
    this.testService.getTest1Questionlist().subscribe((res:any)=>{
      this.totalQuizQues = res;
      let unique = [];
      res.forEach(element => {
        unique.push(element.relation)
      });
      this.uniqueRelation= [...new Set(unique)]; 
      console.log(this.uniqueRelation[0])
      this.TestQuiz = res.filter(obj => obj.relation == this.uniqueRelation[0])
      this.currentQuestion = 0;
      console.log(this.TestQuiz.length)
    })
  }
}
