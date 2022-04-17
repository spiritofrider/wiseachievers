import { Component, OnInit } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { SignupComponent } from "src/app/shared/common/signup/signup.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  bsModalRef: any;

  constructor(private BsModalService: BsModalService) {}

  ngOnInit(): void {}

  consultingSignUp() {
    this.bsModalRef = this.BsModalService.show(SignupComponent, {
      backdrop: "static",
      keyboard: false,
    });
  }
}
