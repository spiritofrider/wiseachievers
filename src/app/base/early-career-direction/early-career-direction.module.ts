import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  Route,
  RouterModule,
  Routes,
  UrlMatchResult,
  UrlSegment,
} from "@angular/router";
import { EarlyCareerDirectionLandingComponent } from "./landing/early-career-direction-landing.component";
import { EarlyCareerDirectionQuestionComponent } from "./question/early-career-direction-question.component";
import { EarlyCareerDirectionResultsComponent } from "./results/early-career-direction-results.component";
import { EarlyCareerDirectionResultsGuard } from "./results/early-career-direction-results.guard";
import { EarlyCareerDirectionShellComponent } from "./shell/early-career-direction-shell.component";

export function earlyCareerDirectionQuestionMatcher(
  segments: UrlSegment[]
): UrlMatchResult | null {
  if (segments.length !== 1) {
    return null;
  }

  const match = segments[0].path.match(
    /^early-career-direction-question-(\d+)$/
  );

  if (!match) {
    return null;
  }

  return {
    consumed: segments,
    posParams: {
      questionNumber: new UrlSegment(match[1], {}),
    },
  };
}

const questionRoute: Route = {
  matcher: earlyCareerDirectionQuestionMatcher,
  component: EarlyCareerDirectionQuestionComponent,
};

const routes: Routes = [
  {
    path: "",
    component: EarlyCareerDirectionShellComponent,
    children: [
      {
        path: "",
        component: EarlyCareerDirectionLandingComponent,
        pathMatch: "full",
      },
      {
        path: "results",
        component: EarlyCareerDirectionResultsComponent,
        canDeactivate: [EarlyCareerDirectionResultsGuard],
      },
      questionRoute,
      {
        path: "**",
        redirectTo: "",
      },
    ],
  },
];

@NgModule({
  declarations: [
    EarlyCareerDirectionShellComponent,
    EarlyCareerDirectionLandingComponent,
    EarlyCareerDirectionQuestionComponent,
    EarlyCareerDirectionResultsComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)],
})
export class EarlyCareerDirectionModule {}
