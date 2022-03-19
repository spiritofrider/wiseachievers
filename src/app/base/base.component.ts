import { LocationStrategy } from "@angular/common";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-base",
  templateUrl: "./base.component.html",
  styleUrls: ["./base.component.scss"],
})
export class BaseComponent implements OnInit {
  constructor(private location: LocationStrategy) {
    history.pushState(null, null, window.location.href);
    this.location.onPopState(() => {
      history.pushState(null, null, window.location.href);
    });
  }

  ngOnInit(): void {}
}
