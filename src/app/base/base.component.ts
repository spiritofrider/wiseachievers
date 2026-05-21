import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit {
  constructor(private location: LocationStrategy, private router: Router) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {}

  isEarlyCareerQuestionRoute(): boolean {
    return this.isEarlyCareerFullScreenRoute();
  }

  isEarlyCareerFullScreenRoute(): boolean {
    return /\/base\/early-career-direction\/early-career-direction-question-\d+$/.test(
      this.router.url
    ) || /^\/base\/early-career-direction\/results\/?$/.test(this.router.url);
  }

  isEarlyCareerLandingRoute(): boolean {
    return /^\/base\/early-career-direction\/?$/.test(this.router.url);
  }
}
