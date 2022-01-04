import { Component, OnInit } from '@angular/core';
import { ExampleTestService } from '../../services/example-test.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
@Component({
  selector: 'app-test-example',
  templateUrl: './test-example.component.html',
  styleUrls: ['./test-example.component.scss']
})
export class TestExampleComponent implements OnInit {
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
  constructor(private testExample: ExampleTestService) { }

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

  nextQuestion(){
    this.currentQuestion += 1;
    console.log(this.firstPref)
    this.scoreCalculator(this.firstPref,this.firstPrefScore);
    this.scoreCalculator(this.secondPref,this.secondPrefScore);
    this.scoreCalculator(this.thirdPref,this.thirdPrefScore);
    if(this.currentQuestion == 9){
      this.result = true;
      this.barChartData = [{data:[this.intellectualPoints,this.businessPoints,this.artistPoints,this.pragmaticPoints,this.organiserPoints,this.socialPoints,this.sportsPoints], label: 'Skills'}]
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
