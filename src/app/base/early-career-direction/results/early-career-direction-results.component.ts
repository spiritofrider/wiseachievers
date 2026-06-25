import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Router, UrlTree } from "@angular/router";
import { Observable, Subject } from "rxjs";
import * as Highcharts from "highcharts";
import html2canvas from "html2canvas";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";
import {
  EarlyCareerDirectionAiReport,
  EarlyCareerDirectionSubmissionPayload,
  EarlyCareerDirectionService,
} from "../early-career-direction.service";

(pdfMake as any).addVirtualFileSystem(pdfFonts);

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
          this.aiReport = {
            ...response.report,
            reportId: response.report.reportId || response.reportId,
          };
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

  async downloadReportAsImage(): Promise<void> {
    if (!this.aiReport || !this.graphRendered) {
      return;
    }

    const reportElement = document.getElementById("early-career-results-report");
    if (!reportElement) {
      return;
    }

    const canvas = await html2canvas(reportElement, {
      backgroundColor: "#ffffff",
      scale: 2,
      scrollY: -window.scrollY,
      useCORS: true,
      onclone: (clonedDocument) => {
        const clonedReport = clonedDocument.getElementById(
          "early-career-results-report"
        );

        if (clonedReport) {
          clonedReport.style.background = "#ffffff";
        }
      },
    });
    const downloadLink = document.createElement("a");

    downloadLink.href = canvas.toDataURL("image/png");
    downloadLink.download = "early-career-direction-report.png";
    downloadLink.click();
  }

  downloadReportAsPdf(): void {
    if (!this.aiReport) {
      return;
    }

    const documentDefinition = this.buildReportDocumentDefinition(
      this.aiReport
    );

    pdfMake
      .createPdf(documentDefinition)
      .download("early-career-direction-report.pdf");
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
    const scoreLabels = this.getScoreLabels();

    Highcharts.chart("career-results-score-graph", {
      chart: {
        type: "line",
        height: "100%",
        backgroundColor: "transparent",
        spacing: [18, 78, 24, 82],
        events: {
          render: function () {
            const chart = this as Highcharts.Chart & {
              scoreBar?: Highcharts.SVGElement;
              scorePointerLine?: Highcharts.SVGElement;
              scorePointerArrow?: Highcharts.SVGElement;
            };
            const xAxis = chart.xAxis[0];
            const yAxis = chart.yAxis[0];
            const centerX = xAxis.toPixels(0, false);
            const pointerY = yAxis.toPixels(score, false);
            const top = yAxis.toPixels(15, false);
            const bottom = yAxis.toPixels(-15, false);
            const barWidth = 14;
            const pointerStartX = centerX + 72;
            const pointerEndX = centerX + barWidth / 2 + 3;
            const pointerPath: Highcharts.SVGPathArray = [
              ["M", pointerStartX, pointerY],
              ["L", pointerEndX, pointerY],
            ];
            const pointerArrowPath: Highcharts.SVGPathArray = [
              ["M", pointerEndX, pointerY],
              ["L", pointerEndX + 11, pointerY - 7],
              ["L", pointerEndX + 11, pointerY + 7],
              ["Z"],
            ];
            const barFill: Highcharts.GradientColorObject = {
              linearGradient: {
                x1: 0,
                y1: 1,
                x2: 0,
                y2: 0,
              },
              stops: [
                [0, "#ef4444"],
                [0.5, "#facc15"],
                [1, "#22c55e"],
              ],
            };

            const barAttributes: Highcharts.SVGAttributes = {
              x: centerX - barWidth / 2,
              y: top,
              width: barWidth,
              height: bottom - top,
              r: barWidth / 2,
              fill: barFill,
              zIndex: 0,
            };

            if (chart.scoreBar) {
              chart.scoreBar.attr(barAttributes);
              chart.scorePointerLine.attr({ d: pointerPath });
              chart.scorePointerArrow.attr({ d: pointerArrowPath });
              return;
            }

            chart.scoreBar = chart.renderer
              .rect(
                centerX - barWidth / 2,
                top,
                barWidth,
                bottom - top,
                barWidth / 2
              )
              .attr(barAttributes)
              .add();

            chart.scorePointerLine = chart.renderer
              .path(pointerPath)
              .attr({
                stroke: "#111111",
                "stroke-width": 2,
                "stroke-linecap": "round",
                zIndex: 2,
              })
              .add();

            chart.scorePointerArrow = chart.renderer
              .path(pointerArrowPath)
              .attr({
                fill: "#111111",
                zIndex: 3,
              })
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
        min: -1,
        max: 1,
        lineWidth: 0,
        tickLength: 0,
        gridLineWidth: 0,
        labels: {
          enabled: false,
        },
      },
      yAxis: {
        min: -15,
        max: 15,
        tickPositions: [-15, -10, -5, 0, 5, 10, 15],
        lineWidth: 0,
        gridLineWidth: 0,
        tickLength: 9,
        tickWidth: 1,
        tickColor: "#7894a6",
        labels: {
          formatter: function () {
            return scoreLabels[this.value as number] || "";
          },
          style: {
            color: "#405f73",
            fontSize: "12px",
            fontWeight: "600",
          },
        },
        title: {
          text: null,
        },
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
            [0, -15],
            [0, 15],
          ],
          lineWidth: 0,
          marker: {
            enabled: false,
          },
          color: "transparent",
        },
        {
          type: "line",
          data: [],
          lineWidth: 0,
          marker: {
            enabled: false,
          },
          color: "transparent",
        },
      ],
    });

    this.renderSpeedometer(score);
  }

  private renderSpeedometer(score: number): void {
    const scoreLabels = this.getScoreLabels();
    const currentStatus = this.getStatusLabel(score);
    const normalizedScore = (score + 15) / 30;
    const needleAngle = -90 + normalizedScore * 180;

    Highcharts.chart("career-results-speedometer", {
      chart: {
        height: 340,
        backgroundColor: "transparent",
        spacing: [22, 48, 58, 48],
        events: {
          render: function () {
            const chart = this as Highcharts.Chart & {
              speedometerArc?: Highcharts.SVGElement;
              speedometerLabels?: Highcharts.SVGElement[];
              speedometerNeedle?: Highcharts.SVGElement;
              speedometerNeedleArrow?: Highcharts.SVGElement;
              speedometerHub?: Highcharts.SVGElement;
              speedometerScore?: Highcharts.SVGElement;
            };
            const centerX = chart.plotLeft + chart.plotWidth / 2;
            const isCompact = chart.plotWidth < 420;
            const centerY = chart.plotTop + chart.plotHeight - 18;
            const radius = Math.max(
              96,
              Math.min(chart.plotWidth / 2 - 52, chart.plotHeight - 62)
            );
            const innerRadius = radius - 16;
            const startAngle = -Math.PI;
            const endAngle = 0;
            const angle = (needleAngle - 90) * (Math.PI / 180);
            const needleLength = radius - 24;
            const needleTipX = centerX + Math.cos(angle) * needleLength;
            const needleTipY = centerY + Math.sin(angle) * needleLength;
            const arrowBaseX = centerX + Math.cos(angle) * (needleLength - 14);
            const arrowBaseY = centerY + Math.sin(angle) * (needleLength - 14);
            const arrowWing = 7;
            const labelFontSize = isCompact ? "10px" : "12px";
            const labelY = centerY + 24;
            const labelOffset = Math.max(72, radius - (isCompact ? 18 : 4));
            const labelPoints = [
              {
                text: scoreLabels[-15],
                x: centerX - labelOffset,
                y: labelY,
              },
              {
                text: scoreLabels[0],
                x: centerX,
                y: centerY - radius - (isCompact ? 8 : 12),
              },
              {
                text: scoreLabels[15],
                x: centerX + labelOffset,
                y: labelY,
              },
            ];
            const needlePath: Highcharts.SVGPathArray = [
              ["M", centerX, centerY],
              ["L", needleTipX, needleTipY],
            ];
            const needleArrowPath: Highcharts.SVGPathArray = [
              ["M", needleTipX, needleTipY],
              [
                "L",
                arrowBaseX + Math.cos(angle + Math.PI / 2) * arrowWing,
                arrowBaseY + Math.sin(angle + Math.PI / 2) * arrowWing,
              ],
              [
                "L",
                arrowBaseX + Math.cos(angle - Math.PI / 2) * arrowWing,
                arrowBaseY + Math.sin(angle - Math.PI / 2) * arrowWing,
              ],
              ["Z"],
            ];
            const arcFill: Highcharts.GradientColorObject = {
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

            if (chart.speedometerArc) {
              chart.speedometerArc.attr({
                x: centerX,
                y: centerY,
                r: radius,
                innerR: innerRadius,
                start: startAngle,
                end: endAngle,
              });
              chart.speedometerLabels.forEach((label, index) => {
                label.attr({
                  text: labelPoints[index].text,
                  x: labelPoints[index].x,
                  y: labelPoints[index].y,
                });
                label.css({
                  fontSize: labelFontSize,
                });
              });
              chart.speedometerNeedle.attr({ d: needlePath });
              chart.speedometerNeedleArrow.attr({ d: needleArrowPath });
              chart.speedometerHub.attr({
                cx: centerX,
                cy: centerY,
                r: 6,
              });
              chart.speedometerScore.attr({
                text: currentStatus,
                x: centerX,
                y: centerY + 32,
              });
              chart.speedometerScore.css({
                fontSize: labelFontSize,
              });
              return;
            }

            chart.speedometerArc = chart.renderer
              .arc(centerX, centerY, radius, innerRadius, startAngle, endAngle)
              .attr({
                fill: arcFill,
                zIndex: 0,
              })
              .add();

            chart.speedometerLabels = labelPoints.map((label) =>
              chart.renderer
                .text(label.text, label.x, label.y)
                .attr({ align: "center" })
                .css({
                  color: "#405f73",
                  fontSize: labelFontSize,
                  fontWeight: "600",
                })
                .add()
            );

            chart.speedometerNeedle = chart.renderer
              .path(needlePath)
              .attr({
                stroke: "#111111",
                "stroke-width": 4,
                "stroke-linecap": "round",
                zIndex: 2,
              })
              .add();

            chart.speedometerNeedleArrow = chart.renderer
              .path(needleArrowPath)
              .attr({
                fill: "#111111",
                zIndex: 3,
              })
              .add();

            chart.speedometerHub = chart.renderer
              .circle(centerX, centerY, 6)
              .attr({
                fill: "#111111",
                zIndex: 3,
              })
              .add();

            chart.speedometerScore = chart.renderer
              .text(currentStatus, centerX, centerY + 32)
              .attr({ align: "center" })
              .css({
                color: "#17354d",
                fontSize: labelFontSize,
                fontWeight: "700",
              })
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
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      series: [
        {
          type: "line",
          data: [[0, 0]],
          visible: false,
          enableMouseTracking: false,
        },
      ],
    });
  }

  private getScoreLabels(): { [score: number]: string } {
    return {
      [-15]: "At Risk",
      [-10]: "Poor",
      [-5]: "Unsteady",
      0: "Stagnant",
      5: "Progressing",
      10: "Strong",
      15: "Excellent",
    };
  }

  private getStatusLabel(score: number): string {
    const scoreLabels = this.getScoreLabels();
    const closestScore = Object.keys(scoreLabels)
      .map((value) => Number(value))
      .reduce((closest, value) =>
        Math.abs(value - score) < Math.abs(closest - score) ? value : closest
      );

    return scoreLabels[closestScore];
  }

  private buildReportDocumentDefinition(
    report: EarlyCareerDirectionAiReport
  ): TDocumentDefinitions {
    const score = Math.max(-15, Math.min(15, this.totalScore));
    const status = this.getStatusLabel(score);

    return {
      pageSize: "A4",
      pageMargins: [42, 44, 42, 48],
      defaultStyle: {
        color: "#405f73",
        font: "Roboto",
        fontSize: 10.5,
        lineHeight: 1.35,
      },
      footer: (currentPage, pageCount) => ({
        margin: [42, 0, 42, 24],
        columns: [
          {
            text: "Wise Achievers",
            color: "#7894a6",
            fontSize: 8,
            bold: true,
          },
          {
            text: `${currentPage} / ${pageCount}`,
            alignment: "right",
            color: "#7894a6",
            fontSize: 8,
          },
        ],
      }),
      styles: {
        title: {
          color: "#17354d",
          fontSize: 22,
          bold: true,
          margin: [0, 0, 0, 6],
        },
        subtitle: {
          color: "#557084",
          fontSize: 10.5,
          margin: [0, 0, 0, 18],
        },
        sectionTitle: {
          color: "#17354d",
          fontSize: 13,
          bold: true,
          margin: [0, 0, 0, 8],
        },
        sectionBody: {
          color: "#405f73",
          margin: [0, 0, 0, 4],
        },
      },
      content: [
        {
          stack: [
            { text: "Career Progress Report", style: "title" },
            {
              text: "Career Status Indicator and personalized guidance",
              style: "subtitle",
            },
          ],
        },
        this.buildStatusScale(score, status),
        {
          text: report.overallSummary,
          style: "sectionBody",
          margin: [0, 8, 0, 18],
        },
        {
          columns: [
            this.buildReportSection("Strengths", report.strengths, "#f0fbf4"),
            this.buildReportSection(
              "Improvement Areas",
              report.improvementAreas,
              "#fff4f4"
            ),
          ],
          columnGap: 14,
        },
        this.buildReportSection("Next Steps", report.nextSteps, "#f7fbff", [
          0,
          14,
          0,
          0,
        ]),
        {
          table: {
            widths: ["*", 118],
            body: [
              [
                {
                  stack: [
                    {
                      text: "Need Personal Guidance?",
                      color: "#0081d6",
                      fontSize: 8,
                      bold: true,
                      margin: [0, 0, 0, 4],
                    },
                    {
                      text: "Speak with Thomas D'souza",
                      color: "#17354d",
                      fontSize: 13,
                      bold: true,
                      margin: [0, 0, 0, 4],
                    },
                    {
                      text: "Discuss your report with a counsellor and get clearer next steps for your career direction.",
                      color: "#405f73",
                    },
                  ],
                  fillColor: "#f7fbff",
                  border: [false, false, false, false],
                  margin: [14, 12, 8, 12],
                },
                {
                  stack: [
                    {
                      text: "9819439307",
                      alignment: "center",
                      color: "#ffffff",
                      bold: true,
                    },
                  ],
                  fillColor: "#0081d6",
                  border: [false, false, false, false],
                  margin: [10, 21, 10, 21],
                },
              ],
            ],
          },
          layout: "noBorders",
          margin: [0, 14, 0, 0],
        },
        {
          text: `Report ID: ${report.reportId}`,
          color: "#7894a6",
          fontSize: 8.5,
          alignment: "right",
          margin: [0, 12, 0, 0],
        },
      ],
    };
  }

  private buildReportSection(
    title: string,
    items: string[],
    fillColor: string,
    margin: [number, number, number, number] = [0, 0, 0, 0]
  ): Content {
    return {
      table: {
        widths: ["*"],
        body: [
          [
            {
              stack: [
                { text: title, style: "sectionTitle" },
                {
                  ul: items.map((item) => ({
                    text: item,
                    margin: [0, 0, 0, 5],
                  })),
                },
              ],
              fillColor,
              border: [false, false, false, false],
              margin: [14, 12, 14, 12],
            },
          ],
        ],
      },
      layout: "noBorders",
      margin,
    };
  }

  private buildStatusScale(score: number, status: string): Content {
    const barTop = 8;
    const barHeight = 216;
    const pointerY = barTop + ((15 - score) / 30) * barHeight;

    return {
      columns: [
        {
          width: "*",
          stack: [
            {
              text: "Career Status Indicator",
              style: "sectionTitle",
              margin: [0, 0, 0, 6],
            },
            {
              text: "Below is the graphical representation of your current career progress.",
              color: "#557084",
              margin: [0, 0, 0, 12],
            },
            {
              text: status,
              color: "#17354d",
              fontSize: 16,
              bold: true,
              margin: [0, 0, 0, 4],
            },
          ],
        },
        {
          width: 210,
          canvas: [
            {
              type: "rect",
              x: 82,
              y: barTop,
              w: 14,
              h: 72,
              r: 7,
              color: "#22c55e",
            },
            {
              type: "rect",
              x: 82,
              y: barTop + 72,
              w: 14,
              h: 72,
              color: "#facc15",
            },
            {
              type: "rect",
              x: 82,
              y: barTop + 144,
              w: 14,
              h: 72,
              r: 7,
              color: "#ef4444",
            },
            {
              type: "line",
              x1: 154,
              y1: pointerY,
              x2: 105,
              y2: pointerY,
              lineWidth: 2,
              lineColor: "#111111",
            },
            {
              type: "polyline",
              points: [
                { x: 101, y: pointerY },
                { x: 112, y: pointerY - 7 },
                { x: 112, y: pointerY + 7 },
              ],
              closePath: true,
              color: "#111111",
            },
          ],
          margin: [0, 0, 0, 0],
        },
        {
          width: 96,
          stack: [
            { text: "Excellent", color: "#405f73", fontSize: 9 },
            {
              text: "Strong",
              color: "#405f73",
              fontSize: 9,
              margin: [0, 25, 0, 0],
            },
            {
              text: "Progressing",
              color: "#405f73",
              fontSize: 9,
              margin: [0, 25, 0, 0],
            },
            {
              text: "Stagnant",
              color: "#405f73",
              fontSize: 9,
              margin: [0, 25, 0, 0],
            },
            {
              text: "Unsteady",
              color: "#405f73",
              fontSize: 9,
              margin: [0, 25, 0, 0],
            },
            {
              text: "Poor",
              color: "#405f73",
              fontSize: 9,
              margin: [0, 25, 0, 0],
            },
            {
              text: "At Risk",
              color: "#405f73",
              fontSize: 9,
              margin: [0, 25, 0, 0],
            },
          ],
        },
      ],
      columnGap: 8,
      margin: [0, 0, 0, 18],
    };
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
