import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CONSTOBJ } from "src/app/shared/shared-constant";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TestService {
  constructor(private httpClient: HttpClient) {}

  getTest1Questionlist(testNo) {
    return this.httpClient.get(
      environment.baseTestUrlNodeRender + CONSTOBJ["test"]["getTest1List"] + testNo
    );
  }

  storeTestApi(body) {
    return this.httpClient.post(
      environment.baseCalculationUrlRender + CONSTOBJ["test"]["storeTest"],
      body
    );
  }
}
