import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { new_age_careers_list } from "./new_age_careers_list.js";
export interface CareersList {
  title: string;
  description: string;
}

@Component({
  selector: "app-new-aicareers",
  templateUrl: "./new-aicareers.component.html",
  styleUrls: ["./new-aicareers.component.scss"],
})
export class NewAICareersComponent implements OnInit {
  public careersList: CareersList[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.careersList = new_age_careers_list;
  }
}
