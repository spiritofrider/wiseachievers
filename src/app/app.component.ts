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
        const navbar = document.getElementById("navbar_top");
        const timer = document.getElementById("timer");
        const isEarlyCareerLanding =
          window.location.hash === "#/base/early-career-direction";

        if (isEarlyCareerLanding) {
          navbar?.classList.remove("nav-sticky");
          timer?.classList.remove("sticky-timer");
          return;
        }

        if (window.scrollY > 50) {
          if (!(document.getElementById("Test_Screen")||document.getElementById("Report_Page")||document.getElementById("Graph_Page"))) {
            navbar?.classList.add("nav-sticky");
          }
          if (timer) {
            timer.classList.add("sticky-timer");
            navbar?.classList.remove("nav-sticky");
          }
        } else {
          navbar?.classList.remove("nav-sticky");
          timer?.classList.remove("sticky-timer");
        }
      });
    });
  }
}
