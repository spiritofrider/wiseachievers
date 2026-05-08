import { Component, OnInit } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, Subject } from "rxjs";
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
  showResubmissionAlert = false;
  private allowLandingNavigation = false;
  private pendingNavigation: Subject<boolean | UrlTree> | null = null;
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

  confirmResubmissionNavigation(): boolean | Observable<boolean | UrlTree> {
    if (!this.submissionExists || this.allowLandingNavigation) {
      return true;
    }

    if (this.pendingNavigation) {
      return this.pendingNavigation.asObservable();
    }

    this.showResubmissionAlert = true;
    this.pendingNavigation = new Subject<boolean | UrlTree>();
    return this.pendingNavigation.asObservable();
  }

  stayOnResults(): void {
    this.showResubmissionAlert = false;
    this.resolvePendingNavigation(false);
  }

  returnToLanding(): void {
    this.allowLandingNavigation = true;
    this.showResubmissionAlert = false;
    this.resolvePendingNavigation(
      this.router.parseUrl("/base/early-career-direction")
    );
  }

  private isValidEmail(): boolean {
    return this.emailPattern.test(this.email.trim());
  }

  private resolvePendingNavigation(result: boolean | UrlTree): void {
    if (!this.pendingNavigation) {
      return;
    }

    this.pendingNavigation.next(result);
    this.pendingNavigation.complete();
    this.pendingNavigation = null;
  }
}
