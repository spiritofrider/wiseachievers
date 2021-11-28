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
  constructor(private testExample: ExampleTestService) { }

  ngOnInit() {
    this.exampleTestQuiz = this.testExample.getExampleTest();
    this.currentQuestion = 0;
    console.log(this.exampleTestQuiz);
  }

  nextQuestion(){
    this.currentQuestion += 1;
  }

  firstPreferenceChange(e:any){
    console.log(e);
    this.scoreCalculator(e['target']['defaultValue']);
  }

  secondPreferenceChange(e:any){
    console.log(e);
    this.scoreCalculator(e['target']['defaultValue']);
  }

  thirdPreferenceChange(e:any){
    console.log(e);
    this.scoreCalculator(e['target']['defaultValue']);
  }

  scoreCalculator(e){
    switch(e){
      case 'Business':
        this.businessPoints += 1;
      case 'Artist':
        this.artistPoints += 1;
      case 'Intellectual':
        this.intellectualPoints += 1;
      case 'Sports':
        this.sportsPoints += 1;
      case 'Organiser':
        this.organiserPoints += 1;
      case 'Pragmatic':
        this.pragmaticPoints += 1;
      case 'NA':
        this.pragmaticPoints += 1;
    }
  }

}
