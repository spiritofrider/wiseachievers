import { Component, Input, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataset } from "chart.js";
import html2canvas from "html2canvas";
import * as Highcharts from "highcharts";
import HC_exporting from "highcharts/modules/exporting";
import HC_exportData from "highcharts/modules/export-data";
import highcharts3d from "highcharts/highcharts-3d";
import { saveAs } from "file-saver";

import * as fs from "fs";
import { Document, ImageRun, Media, Packer, Paragraph, TextRun } from "docx";

@Component({
  selector: "app-graphs",
  templateUrl: "./graphs.component.html",
  styleUrls: ["./graphs.component.scss"],
})
export class GraphsComponent implements OnInit {
  @Input() graphInfo;

  barGraphColors: string[] = [
    "#f4c2c2",
    "#b000b5",
    "#c0ffee",
    "#ffbf00",
    "#f2f3f4",
    "#8db600",
    "#b2beb5",
    "#6e7f80",
    "#ff2052",
    "#848482",
    "#ffebcd",
    "#a2a2d0",
    "#0095b6",
    "#e3dac9",
    "#f0dc82",
    "#ffbcd9",
    "#a9a9a9",
    "#734f96",
    "#779ecb",
    "#8fbc8f",
    "#918151",
    "#fad6a5",
    "#f0ead6",
    "#e1a95f",
    "#85bb65",
    "#edc9af",
    "#50c878",
    "#e5aa70",
    "#eedc82",
    "#a67b5b",
    "#ff00ff",
    "#6082b6",
    "#808000",
    "#446ccf",
    "#b2ec5d",
    "#bdda57",
    "#a9ba9d",
    "#ccccff",
  ];

  public chartType: ChartType = "bar";

  public pieChartType: ChartType = "pie";

  public chartLegend = false;
  public pieChartLegend = true;
  public barChartData: ChartDataset[];

  public career2Labels: string[];
  public career2Data: ChartDataset[] = [];

  public career3Labels: string[];
  public career3Data: ChartDataset[] = [];

  public personality1Labels: string[];
  public personality1Data: ChartDataset[] = [];

  public personality2Labels: string[];
  public personality2Data: ChartDataset[] = [];

  public aptitudeLabels: string[] = [
    "English Ability",
    "Numerical Ability",
    "Mechanical Ability",
    "Visual Spatial Ability",
  ];
  public aptitudeData: ChartDataset[] = [];

  constructor() {}

  ngOnInit(): void {
    this.career2Labels = Object.keys(this.graphInfo.test_2.info);
    this.career2Data = this.chartObject("test_2", "Career interest chart");

    this.career3Labels = Object.keys(this.graphInfo.test_3.info);
    this.career3Data = this.chartObject("test_3", "Career interest chart");

    this.personality1Labels = Object.keys(this.graphInfo.test_4.info);
    this.personality1Data = this.chartObject("test_4", "Personality chart");

    this.personality2Labels = Object.keys(this.graphInfo.test_5.info);
    this.personality2Data = this.chartObject("test_5", "Personality chart");

    this.aptitudeData = this.aptitudeObject("Aptitude results");
  }

  ngAfterViewInit() {
    this.generating3DPieChart(this.graphInfo.test_3.info);
    this.generating3DBarChart(
      this.career2Data,
      this.career2Labels,
      "Career interest chart",
      "barContainerCareer2"
    );
    this.generating3DBarChart(
      this.personality1Data,
      this.personality1Labels,
      "Personality chart",
      "barContainerPersonality1"
    );
    this.generating3DBarChart(
      this.personality2Data,
      this.personality2Labels,
      "Personality chart",
      "barContainerPersonality2"
    );
    this.generating3DBarChart(
      this.aptitudeData,
      this.aptitudeLabels,
      "Aptitude results",
      "barContainerAptitude"
    );
  }

  chartObject(testNumber, header) {
    return [
      {
        data: this.chartData(testNumber),
      },
    ];
  }
  chartData(testNumber) {
    const data = this.graphInfo[testNumber].info;
    return Object.keys(data).map((k) => data[k]);
  }

  aptitudeObject(header) {
    return [
      {
        data: [
          this.graphInfo.test_6.info,
          this.graphInfo.test_7.info,
          this.graphInfo.test_8.info,
          this.graphInfo.test_9.info,
        ],
        label: header,
      },
    ];
  }

  generating3DPieChart(chartData) {
    HC_exporting(Highcharts);
    HC_exportData(Highcharts);

    let pieChartData = [];
    Object.keys(chartData).forEach((element) => {
      pieChartData.push([element, chartData[element]]);
    });
    highcharts3d(Highcharts);

    Highcharts.chart("container", {
      chart: {
        type: "pie",
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: "Career interest chart",
      },
      accessibility: {
        point: {
          //valueSuffix: "%",
        },
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.y}</b>",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          depth: 35,
          dataLabels: {
            enabled: true,
            format: "{point.name} : <b>{point.y}</b>",
          },
        },
      },
      series: [
        {
          type: "pie",
          name: "Career interest chart",
          data: pieChartData,
        },
      ],
    });
  }

  generating3DBarChart(chartData, chartLables, title, id) {
    const barChartData = chartData[0].data.map((data, index) => ({
      y: data,
      color: this.barGraphColors[index],
    }));

    highcharts3d(Highcharts);

    const chart = new Highcharts.Chart({
      chart: {
        renderTo: id,
        type: "column",

        options3d: {
          enabled: true,
          alpha: 0,
          beta: 8,
          depth: 50,
          viewDistance: 30,
        },
      },
      title: {
        text: title,
      },
      plotOptions: {
        column: {
          depth: 25,
        },
      },
      colors: this.barGraphColors,
      xAxis: {
        categories: chartLables,
        labels: {
          skew3d: true,
          style: {
            fontSize: "16px",
          },
        },
      },
      yAxis: this.setYAxisForBarChart(id),
      series: [
        {
          type: "column",
          name: title,
          data: barChartData,
        },
      ],
    });
  }

  setYAxisForBarChart(id: string) {
    if (id === "barContainerAptitude") {
      return {
        min: 0,
        max: 15,
        title: {
          text: null,
        },
      };
    }
    return {
      title: {
        text: null,
      },
    };
  }

  downloadCanvas(event) {
    // get the `<a>` element from click event
    var anchor = event.target;
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    console.log(
      document.getElementById("container"),
      document.getElementsByClassName("highcharts-container")
    );

    anchor.href = (
      document.getElementById("canvas1") as HTMLCanvasElement
    ).toDataURL();

    //anchor.href = imgWrap.toDataURL();
    // set the anchors 'download' attibute (name of the file to be downloaded)
    //console.log(imgWrap, anchor.href.toString());
    //anchor.download = "test.png";

    var svg = document.getElementById("container").children[0].innerHTML;
    var base_image = new Image();

    svg = "data:image/svg+xml," + svg;

    base_image.src = svg;

    console.log(base_image.src.toString());

    let link = document.createElement("a");

    html2canvas(document.getElementById("container")).then(function (canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        // To download directly on browser default 'downloads' location

        //link.download = "image.png";
        link.href = URL.createObjectURL(blob);
        console.log(link.href);

        // To save manually somewhere in file explorer
        // saveAs(blob, "image.png");
      }, "image/png");
    });

    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Hello World"),
                new TextRun({
                  text: "Foo Bar",
                  bold: true,
                }),
                new TextRun({
                  text: "\tGithub is the best",
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new ImageRun({
                  data: link.href,
                  transformation: {
                    width: 100,
                    height: 100,
                  },
                }),
              ],
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  }
}
