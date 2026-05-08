import { Injectable } from "@angular/core";
import { CanDeactivate, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { EarlyCareerDirectionResultsComponent } from "./early-career-direction-results.component";

@Injectable({
  providedIn: "root",
})
export class EarlyCareerDirectionResultsGuard
  implements CanDeactivate<EarlyCareerDirectionResultsComponent>
{
  canDeactivate(
    component: EarlyCareerDirectionResultsComponent
  ): boolean | UrlTree | Observable<boolean | UrlTree> {
    return component.confirmResubmissionNavigation();
  }
}
