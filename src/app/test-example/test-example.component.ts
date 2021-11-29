import { Component, OnInit } from '@angular/core';
import { ExampleTestService } from '../services/example-test.service';

@Component({
  selector: 'app-test-example',
  templateUrl: './test-example.component.html',
  styleUrls: ['./test-example.component.css']
})
export class TestExampleComponent implements OnInit {
  exampleTestQuiz:any;
  currentQuestion:any;
  businessPoints:0;
  artistPoints:0;
  intellectualPoints:0;
  socialPoints:0;
  sportsPoints:0;
  naPoints:0;
  organiserPoints:0;
  pragmaticPoints:0;
  firstPref:any;
  firstPrefScore:3;
  secondPref:any;
  secondPrefScore:2;
  thirdPref:any;
  thirdPrefScore:1;
  result:boolean=false;
  constructor(private testExample: ExampleTestService) { }

  ngOnInit() {
    this.exampleTestQuiz = this.testExample.getExampleTest();
    this.currentQuestion = 0;
    console.log(this.exampleTestQuiz);
  }

  nextQuestion(){
    this.currentQuestion += 1;
    this.scoreCalculator(this.firstPref,this.firstPrefScore);
    this.scoreCalculator(this.secondPref,this.secondPrefScore);
    this.scoreCalculator(this.thirdPref,this.thirdPrefScore);
    if(this.currentQuestion == 9){
      this.result = true;
    }
  }

  firstPreferenceChange(e:any){
    this.firstPref = e['target']['defaultValue'];
  }

  secondPreferenceChange(e:any){
    this.secondPref = e['target']['defaultValue'];
  }

  thirdPreferenceChange(e:any){
    this.thirdPref = e['target']['defaultValue'];
  }

  scoreCalculator(e,score){
    switch(e){
      case 'Business':
        this.businessPoints += score;
      case 'Artist':
        this.artistPoints += score;
      case 'Intellectual':
        this.intellectualPoints += score;
      case 'Sports':
        this.sportsPoints += score;
      case 'Organiser':
        this.organiserPoints += score;
      case 'Pragmatic':
        this.pragmaticPoints += score;
      case 'NA':
        this.pragmaticPoints += score;
    }
  }

  submitExampleTest(){
    this.result = true;
  }

}
