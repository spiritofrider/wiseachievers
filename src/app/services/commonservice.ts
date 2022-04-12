import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CONSTOBJ } from "../shared/shared-constant";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  constructor(private httpClient: HttpClient, private _snackBar: MatSnackBar) {}

  getAllUsers() {
    return this.httpClient.get(
      environment.baseUrlNode + CONSTOBJ["admin"]["getAllUsers"]
    );
  }

  editUsers(id, body) {
    return this.httpClient.put(
      environment.baseUrlNode + CONSTOBJ["admin"]["editUser"] + id,
      body
    );
  }

  loginUser(formbody) {
    return this.httpClient.post(
      environment.baseUrlNode + CONSTOBJ["login"],
      formbody
    );
  }

  registerUser(formbody) {
    return this.httpClient.post(
      environment.baseUrlNode + CONSTOBJ["register"],
      formbody
    );
  }

  testUserStatus(userId) {
    return this.httpClient.get(
      environment.baseUrlNode + CONSTOBJ["testStatus"] + userId
    );
  }

  viewReport(userId) {
    return this.httpClient.get(
      environment.baseCalculationUrl + CONSTOBJ["admin"]["viewReports"] + userId
    );
  }

  snackBar(message: string, snackStyle: string) {
    this._snackBar.open(message, "", {
      duration: 3000,
      panelClass: [snackStyle],
    });
  }
  private isTestStatus = new BehaviorSubject<any>([]);

  updatedTestStatus = this.isTestStatus.asObservable();

  updateData(data: any, keyToShare) {
    switch (keyToShare) {
      case "testStatus":
        this.isTestStatus.next(data);
        break;
    }
  }

  tokenDecryption(token) {
    const helper = new JwtHelperService();
    let decodedToken;
    if (token) {
      decodedToken = helper.decodeToken(token);
    } else {
      decodedToken = {};
    }

    return decodedToken;
  }
}
