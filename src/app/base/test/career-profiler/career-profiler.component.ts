import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-career-profiler',
  templateUrl: './career-profiler.component.html',
  styleUrls: ['./career-profiler.component.scss']
})
export class CareerProfilerComponent implements OnInit {

  @Input() TestQuiz;
  @Input() submissionPart;
  @Output() questionIncrement = new EventEmitter();
  @Output() finalObj = new EventEmitter();


  mainTestObject:any = [];
  currentQuestion:any = 0;

  preferenceObject : any = {
    'id' : '',
    'question' : '',
    'FirstPreferance' : '',
    'SecondPreferance' : '',
    'ThirdPreferance' : '',
    'FirstPreferanceIndex' : null,
    'SecondPreferanceIndex':null,
    'ThirdPreferanceIndex': null
  };
  constructor() { }

  ngOnInit(): void {
   
  }

  ngOnChanges(){
    console.log(this.submissionPart)
    if(!this.submissionPart){
      this.resetPreferenceObject()
      this. currentQuestion = 0;
      this.mainTestObject = [] 
     }
  }





  nextQuestion(){
     if(this.currentQuestion < this.TestQuiz.length-1 ) {
       this.currentQuestion += 1;
       this.CheckBoxLogicCommon();
      
  }
   console.log(this.mainTestObject)}


   prevQues(){
    if(this.currentQuestion > 0){this.currentQuestion -= 1;   }
    this.CheckBoxLogicCommon();
  }


  CheckBoxLogicCommon(){
    this.resetPreferenceObject()
    this.questionIncrement.emit(this.currentQuestion)
    const filledQues = this.mainTestObject.find(e=> e.id == this.TestQuiz[this.currentQuestion].qno)     
    if(filledQues){
      setTimeout( ()=>{
        if(filledQues['FirstPreferanceIndex']){document.getElementById(`f${filledQues['FirstPreferanceIndex']}`)['checked']=true;}
        if(filledQues['SecondPreferanceIndex']){document.getElementById(`s${filledQues['SecondPreferanceIndex']}`)['checked'] = true;}
        if(filledQues['ThirdPreferanceIndex']){document.getElementById(`t${filledQues['ThirdPreferanceIndex']}`)['checked'] = true;}
    },0) 
   
  }
  }


  preferenceSelection(type,e:any,index){
    const filledQues = this.mainTestObject.find(e=> e['id'] == this.TestQuiz[this.currentQuestion].qno)
    if(filledQues){this.preferenceObject = filledQues }
    this.preferenceObject['question'] = this.TestQuiz[this.currentQuestion].question
    this.preferenceObject['id'] = this.TestQuiz[this.currentQuestion].qno
    if(type == 'First'){
      if(!!this.preferenceObject.FirstPreferanceIndex){
      document.getElementById(`f${this.preferenceObject['FirstPreferanceIndex']}`)['checked'] = false;
    }
      if(this.preferenceObject['SecondPreferanceIndex'] == index){this.preferenceObject['SecondPreferanceIndex'] = null}
      if(this.preferenceObject['ThirdPreferanceIndex'] == index){this.preferenceObject['ThirdPreferanceIndex'] = null}
      this.preferenceObject['FirstPreferanceIndex'] = index
      this.preferenceObject['FirstPreferance'] = e['target']['defaultValue'];
    }
    else if(type == 'Second'){
      if(!!this.preferenceObject.SecondPreferanceIndex){
        document.getElementById(`s${this.preferenceObject['SecondPreferanceIndex']}`)['checked'] = false;
      }
      if(this.preferenceObject['FirstPreferanceIndex'] == index){this.preferenceObject['FirstPreferanceIndex'] = null}
      if(this.preferenceObject['ThirdPreferanceIndex'] == index){this.preferenceObject['ThirdPreferanceIndex'] = null}
        this.preferenceObject['SecondPreferanceIndex'] = index
        this.preferenceObject['SecondPreferance'] = e['target']['defaultValue'];
     
    }
    else if(type == 'Third'){
      if(!!this.preferenceObject.ThirdPreferanceIndex){
        document.getElementById(`t${this.preferenceObject['ThirdPreferanceIndex']}`)['checked'] = false;
        
      }
      if(this.preferenceObject['FirstPreferanceIndex'] == index){this.preferenceObject['FirstPreferanceIndex'] = null}
      if(this.preferenceObject['SecondPreferanceIndex'] == index){this.preferenceObject['SecondPreferanceIndex'] = null}
        this.preferenceObject['ThirdPreferanceIndex'] = index
        this.preferenceObject['ThirdPreferance'] = e['target']['defaultValue'];
      
    }
    console.log("preferance object",this.preferenceObject)

    
    if(Object.values(this.preferenceObject).every(v => v) ){
      let filledQues = this.mainTestObject.filter(e=> e['id'] == this.TestQuiz[this.currentQuestion].qno)
      console.log('filled Ques',filledQues)
      if(filledQues.length < 1){
        this.mainTestObject.push(this.preferenceObject)}
      else{ this.mainTestObject.map(obj => filledQues.find(o => o.id === obj.id) || obj);}
    }

    console.log('main object:',this.mainTestObject)
    this.finalObj.emit(this.mainTestObject)
  }


  resetPreferenceObject(){
    this.preferenceObject = {
      'id' : '',
      'question' : '',
      'FirstPreferance' : '',
      'SecondPreferance' : '',
      'ThirdPreferance' : '',
      'FirstPreferanceIndex' : null,
      'SecondPreferanceIndex':null,
      'ThirdPreferanceIndex': null
    };
    
  }


}
