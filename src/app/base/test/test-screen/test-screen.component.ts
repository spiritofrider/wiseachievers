import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { CommonService } from 'src/app/services/commonservice';
import { ExampleTestService } from 'src/app/services/example-test.service';

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

  mainTestObject : any = [];

  exampleTestQuiz:any;
  currentQuestion:any;
  businessPoints:any;
  artistPoints:any;
  intellectualPoints:any;
  socialPoints:any;
  sportsPoints:any;
  naPoints:any;
  organiserPoints:any;
  pragmaticPoints:any;
  firstPref:any;
  firstPrefScore:any;
  secondPref:any;
  secondPrefScore:any;
  thirdPref:any;
  thirdPrefScore:any;
  result:boolean=false;
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = ['Intellectual', 'Business', 'Artist', 'Pragmatic', 'Organiser', 'Social', 'Sports'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[];
  constructor(private testExample: ExampleTestService,private sharedService: CommonService) {  this.currentQuestion = 0;}

  ngOnInit() {
    this.exampleTestQuiz = this.testExample.getExampleTest();
    this.currentQuestion = 0;
    this.artistPoints = 0;
    this.businessPoints = 0;
    this.intellectualPoints = 0;
    this.socialPoints = 0;
    this.organiserPoints = 0;
    this.pragmaticPoints = 0;
    this.sportsPoints = 0;
    this.naPoints = 0;
    this.firstPrefScore = 3;
    this.secondPrefScore = 2;
    this.thirdPrefScore = 1;
  }

  nextQuestion(chart?){

  console.log(this.totalQuestion.length)
    if(Object.values(this.preferenceObject).every(v => v)){
    const prevfilledQues = this.mainTestObject.find(e=> e['question'] == this.exampleTestQuiz[this.currentQuestion].question)
    console.log("filleQues",prevfilledQues)
      if(prevfilledQues){
        //document.getElementById(`b${this.currentQuestion}`).style.backgroundColor = '#0081d6'
        //document.getElementById(`b${this.currentQuestion}`).style.color = 'white'
      }
      else{
      this.mainTestObject.push(this.preferenceObject)
      this.preferenceObject ={
        'question' : '',
        'FirstPreferance' : '',
        'SecondPreferance' : '',
        'ThirdPreferance' : '',
        'FirstPreferanceIndex' : null,
        'SecondPreferanceIndex':null,
        'ThirdPreferanceIndex': null
      };
      document.getElementById(`b${this.currentQuestion}`).style.backgroundColor = '#0081d6'
      document.getElementById(`b${this.currentQuestion}`).style.color = 'white'
    }
    }
    else{
      this.mainTestObject = this.mainTestObject.filter(main => main['question'] !=  this.preferenceObject['question'])
      this.preferenceObject ={
        'question' : '',
        'FirstPreferance' : '',
        'SecondPreferance' : '',
        'ThirdPreferance' : '',
        'FirstPreferanceIndex' : null,
        'SecondPreferanceIndex':null,
        'ThirdPreferanceIndex': null
      };
      //document.getElementById(`b${this.currentQuestion}`).style.backgroundColor = '#ffffff'
      //document.getElementById(`b${this.currentQuestion}`).style.color = 'black' 
    }
   if(this.currentQuestion < this.totalQuestion.length-1 ) {this.currentQuestion += 1;

    const filledQues = this.mainTestObject.find(e=> e['question'] == this.exampleTestQuiz[this.currentQuestion].question)
    console.log("filleQues",filledQues)
   
    if(filledQues){
      setTimeout( ()=>{
        document.getElementById(`f${filledQues['FirstPreferanceIndex']}`)['checked']=true;
        document.getElementById(`s${filledQues['SecondPreferanceIndex']}`)['checked'] = true;
        document.getElementById(`t${filledQues['ThirdPreferanceIndex']}`)['checked'] = true
    },0) 
   
  }
}
  

  
      this.scoreCalculator(this.firstPref,this.firstPrefScore);
      this.scoreCalculator(this.secondPref,this.secondPrefScore);
      this.scoreCalculator(this.thirdPref,this.thirdPrefScore);
      if(chart == 'bar'){
        if(this.mainTestObject.length == this.totalQuestion.length){
        this.result = true;
        this.barChartData = [{data:[this.intellectualPoints,this.businessPoints,this.artistPoints,this.pragmaticPoints,this.organiserPoints,this.socialPoints,this.sportsPoints], label: 'Skills'}]
      }
        else{
          this.sharedService.snackBar("Please submit all the questions",'a')
        }
      }
      
    console.log(this.mainTestObject)
   
  
  }

  prevQues(){
    this.preferenceObject ={
      'question' : '',
      'FirstPreferance' : '',
      'SecondPreferance' : '',
      'ThirdPreferance' : '',
      'FirstPreferanceIndex' : null,
      'SecondPreferanceIndex':null,
      'ThirdPreferanceIndex': null
    };
    if(this.currentQuestion > 0){this.currentQuestion -= 1;}
    const filledQues = this.mainTestObject.find(e=> e['question'] == this.exampleTestQuiz[this.currentQuestion].question)
    if(filledQues){
      setTimeout( ()=>{
        document.getElementById(`f${filledQues['FirstPreferanceIndex']}`)['checked']=true;
        document.getElementById(`s${filledQues['SecondPreferanceIndex']}`)['checked'] = true;
        document.getElementById(`t${filledQues['ThirdPreferanceIndex']}`)['checked'] = true
    },0) 
    }
  }

 
  preferenceSelection(type,e:any,index){
    const filledQues = this.mainTestObject.find(e=> e['question'] == this.exampleTestQuiz[this.currentQuestion].question)
    if(filledQues){this.preferenceObject = filledQues }
    this.preferenceObject['question'] = this.exampleTestQuiz[this.currentQuestion].question
    console.log(this.preferenceObject)
    if(type == 'First'){
      if(!!this.preferenceObject.FirstPreferanceIndex){
      document.getElementById(`f${this.preferenceObject['FirstPreferanceIndex']}`)['checked'] = false;
    }
      if(this.preferenceObject['SecondPreferanceIndex'] == index){this.preferenceObject['SecondPreferanceIndex'] = null}
      if(this.preferenceObject['ThirdPreferanceIndex'] == index){this.preferenceObject['ThirdPreferanceIndex'] = null}
      this.preferenceObject['FirstPreferanceIndex'] = index
      this.preferenceObject['FirstPreferance'] = e['target']['defaultValue'];
      this.firstPref = e['target']['defaultValue'];
    }
    else if(type == 'Second'){
      if(!!this.preferenceObject.SecondPreferanceIndex){
        document.getElementById(`s${this.preferenceObject['SecondPreferanceIndex']}`)['checked'] = false;
      }
      if(this.preferenceObject['FirstPreferanceIndex'] == index){this.preferenceObject['FirstPreferanceIndex'] = null}
      if(this.preferenceObject['ThirdPreferanceIndex'] == index){this.preferenceObject['ThirdPreferanceIndex'] = null}
        this.preferenceObject['SecondPreferanceIndex'] = index
        this.preferenceObject['SecondPreferance'] = e['target']['defaultValue'];
     
      this.secondPref = e['target']['defaultValue'];
    }
    else if(type == 'Third'){
      if(!!this.preferenceObject.ThirdPreferanceIndex){
        document.getElementById(`t${this.preferenceObject['ThirdPreferanceIndex']}`)['checked'] = false;
        
      }
      if(this.preferenceObject['FirstPreferanceIndex'] == index){this.preferenceObject['FirstPreferanceIndex'] = null}
      if(this.preferenceObject['SecondPreferanceIndex'] == index){this.preferenceObject['SecondPreferanceIndex'] = null}
        this.preferenceObject['ThirdPreferanceIndex'] = index
        this.preferenceObject['ThirdPreferance'] = e['target']['defaultValue'];
      
      this.thirdPref = e['target']['defaultValue'];
    }
  }


  scoreCalculator(e,score){
    switch(e){
      case 'Business':
        this.businessPoints = this.businessPoints + score;
        break;
      case 'Artist':
        this.artistPoints = this.artistPoints + score;
        break;
      case 'Intellectual':
        this.intellectualPoints = this.intellectualPoints + score;
        break;
      case 'Sports':
        this.sportsPoints = this.sportsPoints + score;
        break;
      case 'Organiser':
        this.organiserPoints = this.organiserPoints + score;
        break;
      case 'Pragmatic':
        this.pragmaticPoints = this.pragmaticPoints + score;
        break;
      case 'Social':
        this.socialPoints = this.socialPoints + score
        break;
      case 'NA':
        this.naPoints = this.naPoints + score;
        break;
      default:
        this.naPoints = this.naPoints + score;
        break;
    }
  }

  submitExampleTest(){
    this.result = true;
  }

}
