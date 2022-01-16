import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExampleTestService {
  exampleTest = [
    {question:'What type of work would you like to do?',
    options:[
      {value:'I would like to do research and invent userful things.',real:'Intellectual',prefernce:''},
      {value:'I would like to create beautiful things.',real:'Artist',prefernce:''},
      {value:'I would like to be among people so i can get the best out of them',real:'Social',prefernce:''},
      {value:'I would like to sell things so that the best is available for everybody',real:'Business',preference:''},
      {value:'I would like to maintain things so that everything is in order',real:'Pragmatic',preference:''},
      {value:'I would like to organise everything so that things are easy for everybody',real:'Organiser',preference:''},
      {value:' would like to excel in sports',real:'Sports',preference:''},
      {value:'None of the above',real:'NA',preference:''},
    ]},{
      question:'From the below click on the positive attributes which you have which will help you with your work',
      options:[
        {value:'Competitiveness',real:'Sports',preference:''},
        {value:'Ability to lead',real:'Business',preference:''},
        {value:'Efficiency',real:'Organiser',preference:''},
        {value:'Playing a good supportive role',real:'Pragmatic',preference:''},
        {value:'Logical reasoning',real:'Intellectual',preference:''},
        {value:'Natural talent',real:'Artist',preference:''},
        {value:'People skills and socialising',real:'Social',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'From the below click on the positive attributes which you think are very important for your type of work',
      options:[
        {value:'Sense of art',real:'Artist',preference:''},
        {value:'Research and experimentation',real:'Intellectual',preference:''},
        {value:'Communication',real:'Social',preference:''},
        {value:'Business sense',real:'Business',preference:''},
        {value:'Practicality',real:'Pragmatic',preference:''},
        {value:'Measurement of productivity',real:'Organiser',preference:''},
        {value:'Health of body',real:'Sports',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'From the below click on the positive attributes which you will be using very much in your work' ,
      options:[
        {value:'People based solutions',real:'Social',preference:''},
        {value:'Influencing People',real:'Business',preference:''},
        {value:'Being creative',real:'Artist',preference:''},
        {value:'Aquiring Knowledge',real:'Intellectual',preference:''},
        {value:'Orderliness',real:'Organiser',preference:''},
        {value:'Sense of duty',real:'Pragmatic',preference:''},
        {value:'Physical energy',real:'Sports',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'From the below click on the preferances to show which are the areas you would like to work best in',
      options:[
        {value:'Thinking and ideas, futuristic possibilities',real:'Intellectual',preference:''},
        {value:'Development of persons, teach, advice, social issues, communicate',real:'Social',preference:''},
        {value:'Visual side of things, forms, designs, patterns',real:'Artist',preference:''},
        {value:'Business activities, persuation, management',real:'Business',preference:''},
        {value:'Real world materials, wood, metals, tools, machines, plants, animals.',real:'Pragmatic',preference:''},
        {value:'Work with set procedures and routines, data, facts and figures, details.',real:'Organiser',preference:''},
        {value:'Sports field',real:'Sports',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'From the below choices click on the preferances for task which you would best like to do at work',
      options:[
        {value:'Task that are scholarly, analytical and logical in nature',real:'Intellectual',preference:''},
        {value:'Task that are creative, expressive, original and independent',real:'Artist',preference:''},
        {value:'Task that involve socialising and interaction with persons',real:'Social',preference:''},
        {value:'Task that take calculated risk for profit and growth',real:'Business',preference:''},
        {value:'Task that involve physical tangible materials with hands on work',real:'Pragmatic',preference:''},
        {value:'Task that follow set procedures and routines, defined standards and rules',real:'Organiser',preference:''},
        {value:'Task that are athletically competitive  ',real:'Sports',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'From the below choices click on the preferances for task which you would best like to do at work(2)',
      options:[
        {value:'Physical games, athletic activities, sports, sports equipment',real:'Sports',preference:''},
        {value:'Scientific, techinical, investigative, exploration, discovery, inventive',real:'Intellectual',preference:''},
        {value:'Managing business activity, influencing, marketing, growth competition',real:'Business',preference:''},
        {value:'Operate machines, use tools, repair equipment',real:'Pragmatic',preference:''},
        {value:'Teach, counsel, humanitarian, educational',real:'Social',preference:''},
        {value:'Dance, drama, crafts, creative writing, drawing, design, fashion',real:'Artist',preference:''},
        {value:'Numerical activities, statistics, accounting, reporting.',real:'Organiser',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'From the below choices click on the preferances the one word which would best describe you as a working person',
      options:[
        {value:'Practical',real:'Pragmatic',preference:''},
        {value:'Orderly',real:'Organiser',preference:''},
        {value:'Ambitious',real:'Business',preference:''},
        {value:'Intellectual',real:'Intellectual',preference:''},
        {value:'Service oriented',real:'Social',preference:''},
        {value:'Artistic',real:'Artist',preference:''},
        {value:'Athletic',real:'Organiser',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
    {
      question:'Earning our money and having financial growth is the main reason why everybody goes to work.  Work also provides us with contant learning and personal growth. Click on the below preferances to choose which of them would be your happiest route to achieve the above mentioned purposes.',
      options:[
        {value:'Make possible the happening of all things through communication and organisation ',real:'Organiser',preference:''},
        {value:'Solutions for all issues faced by mankind through research and innovative thinking',real:'Organiser',preference:''},
        {value:'Adding meaning and beauty to life through arts, crafts, music, etc.',real:'Business',preference:''},
        {value:'Solving problems through socialisation, humanitarium services, education etc.',real:'Intellectual',preference:''},
        {value:'Through commercial and business activity of my own',real:'Social',preference:''},
        {value:'Achieving all aims by playing one\'s role well through practical thinking',real:'Artist',preference:''},
        {value:'Putting myself and my country on a higher pedestal through sports.',real:'Organiser',preference:''}, 
        {value:'None of the above',real:'NA',preference:''},
      ]
    },
  ]
  constructor() { }

  getExampleTest(){
    return this.exampleTest;
  }
}
