import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { EarlyCareerDirectionService } from "../early-career-direction.service";

@Component({
  selector: "app-early-career-direction-results",
  templateUrl: "./early-career-direction-results.component.html",
  styleUrls: ["./early-career-direction-results.component.scss"],
})
export class EarlyCareerDirectionResultsComponent implements OnInit {
  email = "";
  submitted = false;
  submissionExists = false;
  emailTouched = false;
  private readonly emailPattern =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

  constructor(
    private router: Router,
    private earlyCareerDirectionService: EarlyCareerDirectionService
  ) {}

  ngOnInit(): void {
    this.submissionExists =
      !!this.earlyCareerDirectionService.getLatestSubmission();

    if (!this.submissionExists) {
      this.router.navigate(["/base/early-career-direction"]);
    }
  }

  requestResults(): void {
    const submissionPayload =
      this.earlyCareerDirectionService.getLatestSubmission();

    this.emailTouched = true;

    if (!submissionPayload || !this.isValidEmail()) {
      return;
    }

    const resultsRequestPayload = {
      email: this.email.trim(),
      assessmentSubmission: submissionPayload,
    };

    console.log("Early Career Direction results request", resultsRequestPayload);
    this.submitted = true;
  }

  markEmailTouched(): void {
    this.emailTouched = true;
  }

  hasEmailError(): boolean {
    return this.emailTouched && !this.isValidEmail();
  }

  private isValidEmail(): boolean {
    return this.emailPattern.test(this.email.trim());
  }
}
