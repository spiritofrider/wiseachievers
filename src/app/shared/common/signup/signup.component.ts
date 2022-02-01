import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BsModalService } from "ngx-bootstrap/modal";
import { CommonService } from "src/app/services/commonservice";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private bsModalService: BsModalService,
    private commonService: CommonService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
      ]),
      gender: new FormControl("", [Validators.required]),
      locality: new FormControl("", [Validators.required]),
      lastexam: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  ngOnInit(): void {}

  CancelModal() {
    this.bsModalService.hide();
  }

  submitForm(form) {
    const { name, email, phone, gender, dob, locality, lastexam, password } =
      form;
    let body = {
      fullName: name,
      email: email,
      phone: phone,
      gender: gender,
      dob: dob,
      locality: locality,
      lastExam: lastexam,
      password: password,
      activateAccount: false,
      test_1: { completed: false },
      test_2: {
        completed: false,
        info: {
          Intellectual: 0,
          Sports: 0,
          Artist: 0,
          Social: 0,
          Pragmatic: 0,
          "Persuader/Business": 0,
          Organiser: 0,
          NA: 0,
        },
      },
      test_3: {
        completed: false,
        info: {
          "Visual Spatial": 0,
          Interpersonal: 0,
          Intrapersonal: 0,
          Linguistic: 0,
          Logical: 0,
          Naturalistic: 0,
          "Bodily Kinesthetic": 0,
          Musical: 0,
        },
      },
      test_4: { completed: false },
      test_5: { completed: false },
      test_6: { completed: false },
      test_7: { completed: false },
      test_8: { completed: false },
      test_9: { completed: false },
    };
    /* Object.values(body).every((v) => Object.values(v).every((val) => val)) */
    if (
      name &&
      email &&
      phone &&
      gender &&
      dob &&
      locality &&
      lastexam &&
      password
    ) {
      this.commonService.registerUser(body).subscribe((e) => {
        this.CancelModal();
        this.commonService.snackBar("User registered successfully", "s"),
          (error) => {
            this.CancelModal();
            this.commonService.snackBar(error.message, "e");
          };
      });
    } else {
      alert("Please fill all the details");
    }
  }
}
