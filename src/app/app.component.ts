import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "wiseachievers";
  constructor() {
    document.addEventListener("DOMContentLoaded", function () {
      window.addEventListener("scroll", function () {
        if (window.scrollY > 50) {
          document.getElementById("navbar_top").classList.add("nav-sticky");
          if (document.getElementById("timer")) {
            document.getElementById("timer")?.classList.add("sticky-timer");
            document
              .getElementById("navbar_top")
              .classList.remove("nav-sticky");
          }
        } else {
          document.getElementById("navbar_top").classList.remove("nav-sticky");
          document.getElementById("timer")?.classList.remove("sticky-timer");
        }
      });
    });
  }
}
