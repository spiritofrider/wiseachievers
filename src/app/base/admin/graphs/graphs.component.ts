import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.scss']
})
export class GraphsComponent implements OnInit {
  @Input() graphInfo;

  constructor() { }

  ngOnInit(): void {
  }

}
