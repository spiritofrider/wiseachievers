import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EarlyCareerDirectionService } from "../early-career-direction.service";

@Component({
  selector: "app-early-career-direction-landing",
  templateUrl: "./early-career-direction-landing.component.html",
  styleUrls: ["./early-career-direction-landing.component.scss"],
})
export class EarlyCareerDirectionLandingComponent {
  assessmentTitle = "";
  assessmentDescription = "";

  constructor(
    private router: Router,
    private earlyCareerDirectionService: EarlyCareerDirectionService
  ) {}

  ngOnInit(): void {
    this.earlyCareerDirectionService.getAssessment().subscribe((assessment) => {
      this.assessmentTitle = assessment.title;
      this.assessmentDescription = assessment.description;
    });
  }

  startTest(): void {
    this.router.navigate([
      "/base/early-career-direction/early-career-direction-question-1",
    ]);
  }
}
