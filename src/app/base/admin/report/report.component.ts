import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.scss"],
})
export class ReportComponent implements OnInit {
  @Input() reportInfo;
  constructor() {}

  ngOnInit(): void {}
}
