import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CommonService } from "src/app/services/commonservice";
import { BsModalService } from "ngx-bootstrap/modal";
import { StorageService } from "src/app/services/storage.service";
import { Router } from "@angular/router";
import { SignupComponent } from "../signup/signup.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username: string;
  bsModalRef: any;
  constructor(
    private common: CommonService,
    private BsModalService: BsModalService,
    private storageService: StorageService,
    private route: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {}

  submitForm(formVal) {
    this.common.loginUser(formVal).subscribe(
      (e) => {
        this.Cancel();
        this.storageService.setCookie("token", e["token"]);
        let decodedToken = this.common.tokenDecryption(e["token"]);
        this.username = decodedToken["fullName"];
        if (decodedToken.hasOwnProperty("isAdmin")) {
          this.route.navigate(["base/admin"]);
        }
        if (decodedToken["activateAccount"]) {
          this.route.navigate(["base/test"]);
        } else if (!decodedToken["activateAccount"]) {
          this.route.navigate(["base/home"]);
        }
        this.common.snackBar("Login successful", "s");
        if(!decodedToken["activateAccount"]){this.common.snackBar("Please contact Thomas D'souza to activate your account and access Tests.", "s");
      }
      },
      (error) => {
        this.common.snackBar(error.error.message, "s");
        this.Cancel();
      }
    );
  }

  Cancel() {
    this.BsModalService.hide();
  }

  createNewAccount() {
    this.bsModalRef = this.BsModalService.show(SignupComponent, {
      backdrop: "static",
      keyboard: false,
    });
  }
}
