import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { CommonService } from "src/app/services/commonservice";

import {FormControl,FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import * as moment from "moment";

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
  encapsulation : ViewEncapsulation.None
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  matcher :any;


  constructor(
    private bsModalService: BsModalService,
    private commonService: CommonService
  ) {
    this.registerForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required,Validators.email]),
      phone: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern(/^[0-9]\d*$/)
      ]),
      gender: new FormControl("", [Validators.required]),
      locality: new FormControl("", [Validators.required]),
      lastexam: new FormControl("", [Validators.required]),
      dob: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required,Validators.minLength(3)]),
    });
this.matcher = new MyErrorStateMatcher();
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
      dob: new Date(dob),
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
    console.log(body)
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
