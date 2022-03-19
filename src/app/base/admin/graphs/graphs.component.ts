import { Component, Input, OnInit } from "@angular/core";
import { ChartOptions, ChartType, ChartDataset } from "chart.js";
import html2canvas from "html2canvas";

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
    console.log(this.graphInfo);

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

  chartObject(testNumber, header) {
    return [
      {
        data: this.chartData(testNumber),
        //label: header,
        backgroundColor: this.barGraphColors,
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
        backgroundColor: this.barGraphColors,
      },
    ];
  }

  exportHTML(filename = "") {
    /*  var header =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    var footer = "</body></html>";
    var sourceHTML =
      header + document.getElementById("source-html").innerHTML + footer;

    var source =
      "data:application/vnd.ms-word;charset=utf-8," +
      encodeURIComponent(sourceHTML);
    var fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = "document.docx";
    fileDownload.click();
    document.body.removeChild(fileDownload); */
    var HtmlHead =
      "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";

    var EndHtml = "</body></html>";

    //complete html
    var html =
      HtmlHead + document.getElementById("source-html").innerHTML + EndHtml;

    //specify the type
    var blob = new Blob(["\ufeff", html], {
      type: "application/msword",
    });

    // Specify link url
    var url =
      "data:application/vnd.ms-word;charset=utf-8," + encodeURIComponent(html);

    // Specify file name
    filename = filename ? filename + ".docx" : "document.docx";

    // Create download link element
    var downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    /*  if(navigator.msSaveOrOpenBlob ){
        navigator.msSaveOrOpenBlob(blob, filename);
    }else{ */
    // Create a link to the file
    downloadLink.href = url;

    // Setting the file name
    downloadLink.download = filename;

    //triggering the function
    downloadLink.click();
    // }

    document.body.removeChild(downloadLink);
  }

  downloadCanvas(event) {
    // get the `<a>` element from click event
    var anchor = event.target;
    // get the canvas, I'm getting it by tag name, you can do by id
    // and set the href of the anchor to the canvas dataUrl
    anchor.href = document.getElementsByTagName("canvas")[0].toDataURL();
    // set the anchors 'download' attibute (name of the file to be downloaded)
    console.log(anchor.href);
    anchor.download = "test.png";
  }
}
