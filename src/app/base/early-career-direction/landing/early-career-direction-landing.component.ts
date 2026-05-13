import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { EarlyCareerDirectionService } from "../early-career-direction.service";

@Component({
  selector: "app-early-career-direction-landing",
  templateUrl: "./early-career-direction-landing.component.html",
  styleUrls: ["./early-career-direction-landing.component.scss"],
})
export class EarlyCareerDirectionLandingComponent {
  assessmentTitle = "Career Guidance Assessment";
  assessmentDescription =
    "This is a test for young professionals who want to change careers or improve their existing career path with clearer direction and stronger decision-making support.";

  constructor(
    private router: Router,
    private earlyCareerDirectionService: EarlyCareerDirectionService
  ) {}

  ngOnInit(): void {
    this.earlyCareerDirectionService.getAssessment().subscribe((assessment) => {
      this.assessmentTitle = assessment.title || this.assessmentTitle;
    });
  }

  startTest(): void {
    this.router.navigate([
      "/base/early-career-direction/early-career-direction-question-1",
    ]);
  }
}
