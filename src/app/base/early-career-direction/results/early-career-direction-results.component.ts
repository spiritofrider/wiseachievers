import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, Subject } from "rxjs";
import * as Highcharts from "highcharts";
import {
  EarlyCareerDirectionAiReport,
  EarlyCareerDirectionSubmissionPayload,
  EarlyCareerDirectionService,
} from "../early-career-direction.service";

@Component({
  selector: "app-early-career-direction-results",
  templateUrl: "./early-career-direction-results.component.html",
  styleUrls: ["./early-career-direction-results.component.scss"],
})
export class EarlyCareerDirectionResultsComponent
  implements OnInit, AfterViewInit
{
  submissionPayload: EarlyCareerDirectionSubmissionPayload | null = null;
  submissionExists = false;
  showResubmissionAlert = false;
  totalScore = 0;
  aiReport: EarlyCareerDirectionAiReport | null = null;
  aiReportError = "";
  aiReportGenerated = false;
  graphRendered = false;
  private allowLandingNavigation = false;
  private pendingNavigation: Subject<boolean | UrlTree> | null = null;

  constructor(
    private router: Router,
    private earlyCareerDirectionService: EarlyCareerDirectionService
  ) {}

  ngOnInit(): void {
    this.submissionPayload =
      this.earlyCareerDirectionService.getLatestSubmission();
    this.submissionExists = !!this.submissionPayload;

    if (!this.submissionExists) {
      this.router.navigate(["/base/early-career-direction"]);
      return;
    }

    this.totalScore = this.calculateTotalScore(this.submissionPayload);
  }

  ngAfterViewInit(): void {
    if (!this.submissionExists) {
      return;
    }

    this.generateAiReport();
  }

  generateAiReport(): void {
    if (!this.submissionPayload || this.aiReportGenerated) {
      return;
    }

    this.aiReportGenerated = true;
    this.aiReport = null;
    this.aiReportError = "";
    this.graphRendered = false;

    this.earlyCareerDirectionService
      .generateAiReport(this.submissionPayload)
      .subscribe(
        (response) => {
          this.aiReport = response.report;
          setTimeout(() => this.renderScoreGraph());
        },
        () => {
          this.aiReportGenerated = false;
          this.aiReportError =
            "We could not generate your AI report right now. Please try again.";
        }
      );
  }

  confirmResubmissionNavigation(): boolean | Observable<boolean | UrlTree> {
    if (!this.submissionExists || this.allowLandingNavigation) {
      return true;
    }

    if (this.pendingNavigation) {
      return this.pendingNavigation.asObservable();
    }

    this.showResubmissionAlert = true;
    this.pendingNavigation = new Subject<boolean | UrlTree>();
    return this.pendingNavigation.asObservable();
  }

  stayOnResults(): void {
    this.showResubmissionAlert = false;
    this.resolvePendingNavigation(false);
  }

  returnToLanding(): void {
    this.allowLandingNavigation = true;
    this.showResubmissionAlert = false;
    this.resolvePendingNavigation(
      this.router.parseUrl("/base/early-career-direction")
    );
  }

  private calculateTotalScore(
    submissionPayload: EarlyCareerDirectionSubmissionPayload | null
  ): number {
    if (!submissionPayload) {
      return 0;
    }

    return submissionPayload.responses.reduce(
      (sum, response) => sum + (response.selectedMarks || 0),
      0
    );
  }

  private renderScoreGraph(): void {
    if (this.graphRendered) {
      return;
    }

    this.graphRendered = true;
    const score = Math.max(-15, Math.min(15, this.totalScore));

    Highcharts.chart("career-results-score-graph", {
      chart: {
        type: "line",
        height: 220,
        backgroundColor: "transparent",
        spacing: [18, 24, 24, 24],
        events: {
          render: function () {
            const chart = this as Highcharts.Chart & {
              scoreBar?: Highcharts.SVGElement;
            };
            const xAxis = chart.xAxis[0];
            const yAxis = chart.yAxis[0];
            const left = xAxis.toPixels(-15, false);
            const right = xAxis.toPixels(15, false);
            const barHeight = 22;
            const top = yAxis.toPixels(0, false) - barHeight / 2;
            const barFill: Highcharts.GradientColorObject = {
              linearGradient: {
                x1: 0,
                y1: 0,
                x2: 1,
                y2: 0,
              },
              stops: [
                [0, "#ef4444"],
                [0.5, "#facc15"],
                [1, "#22c55e"],
              ],
            };

            const barAttributes: Highcharts.SVGAttributes = {
              x: left,
              y: top,
              width: right - left,
              height: barHeight,
              r: barHeight / 2,
              fill: barFill,
              zIndex: 0,
            };

            if (chart.scoreBar) {
              chart.scoreBar.attr(barAttributes);
              return;
            }

            chart.scoreBar = chart.renderer
              .rect(left, top, right - left, barHeight, barHeight / 2)
              .attr(barAttributes)
              .add();
          },
        },
      },
      title: {
        text: null,
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: false,
      },
      tooltip: {
        enabled: false,
      },
      xAxis: {
        min: -15,
        max: 15,
        lineWidth: 0,
        tickLength: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
      },
      yAxis: {
        min: -1,
        max: 1,
        visible: false,
      },
      plotOptions: {
        series: {
          enableMouseTracking: false,
          states: {
            inactive: {
              opacity: 1,
            },
          },
        },
      },
      series: [
        {
          type: "line",
          data: [
            [-15, 0],
            [15, 0],
          ],
          lineWidth: 0,
          marker: {
            enabled: false,
          },
          color: "transparent",
        },
        {
          type: "scatter",
          data: [[score, 0.18]],
          marker: {
            enabled: true,
            symbol: "triangle-down",
            radius: 9,
            fillColor: "#111111",
            lineColor: "#111111",
            lineWidth: 1,
          },
          color: "#111111",
        },
      ],
    });
  }

  private resolvePendingNavigation(result: boolean | UrlTree): void {
    if (!this.pendingNavigation) {
      return;
    }

    this.pendingNavigation.next(result);
    this.pendingNavigation.complete();
    this.pendingNavigation = null;
  }
}
