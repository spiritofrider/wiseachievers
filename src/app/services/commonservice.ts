import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { CONSTOBJ } from "../shared/shared-constant";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";
import { JwtHelperService } from "@auth0/angular-jwt";
import jspdf from 'jspdf';
import html2canvas from 'html2canvas';

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

  
  exportAsPDF(div_id:string) {
    // console.log(div_id);
    // let data = document.getElementById(div_id);  
    // console.log(data);
    // html2canvas(data).then(canvas => {
    //   const contentDataURL = canvas.toDataURL('image/png')  
    //   let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
    //   // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
    //   pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);  
    //   pdf.save(`newFile.pdf`);   
    // }); 
    let DATA: any = document.getElementById(div_id);
    // html2canvas(DATA,{scrollY: -window.scrollY}).then((canvas) => {
    //   let fileWidth = 208;
    //   let fileHeight = (1300 * fileWidth) / canvas.width;
    //   const FILEURI = canvas.toDataURL('image/png');
    //   let PDF = new jspdf('p', 'mm', 'a4');
    //   let position = 0;
    //   PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    //   PDF.save('angular-demo.pdf');
    // });
    html2canvas(DATA)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; 
      var pageHeight = 295;  
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      var doc = new jspdf('p', 'mm');
      var position = 0;

      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save( 'file.pdf');﻿
      });
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
