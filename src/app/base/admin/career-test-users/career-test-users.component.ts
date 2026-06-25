import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/commonservice";
import { environment } from "src/environments/environment";

interface CareerTestUserResponse {
  count: number;
  items: CareerTestUserRecord[];
}

interface CareerTestUserRecord {
  reportId?: string;
  assessmentType?: string;
  createdAt?: string;
  totalScore?: number;
}

@Component({
  selector: "app-career-test-users",
  templateUrl: "./career-test-users.component.html",
  styleUrls: ["./career-test-users.component.scss"],
})
export class CareerTestUsersComponent implements OnInit {
  records: CareerTestUserRecord[] = [];
  totalCount = 0;
  errorMessage = "";
  isConfigured = Boolean(environment.careerTestUsersFunctionUrl);

  columns = [
    { key: "reportId", label: "Report ID" },
    { key: "assessmentType", label: "Assessment Type" },
    { key: "createdAt", label: "Created At" },
    { key: "totalScore", label: "Total Score" },
  ];

  constructor(private common: CommonService) {}

  ngOnInit(): void {
    this.loadCareerTestUsers();
  }

  loadCareerTestUsers() {
    this.errorMessage = "";

    if (!this.isConfigured) {
      this.records = [];
      this.totalCount = 0;
      this.errorMessage = "Career test users Lambda URL is not configured.";
      return;
    }

    this.common.getCareerTestUsers().subscribe(
      (response: CareerTestUserResponse) => {
        this.records = this.sortByLatestCreatedAt(response?.items || []);
        this.totalCount = response?.count || this.records.length;
      },
      (error) => {
        this.records = [];
        this.totalCount = 0;
        this.errorMessage =
          error?.error?.message || "Unable to load career test users.";
        this.common.snackBar(this.errorMessage, "s");
      }
    );
  }

  getValue(record: CareerTestUserRecord, key: string) {
    const value = record?.[key];
    return value === undefined || value === null || value === "" ? "-" : value;
  }

  private sortByLatestCreatedAt(records: CareerTestUserRecord[]) {
    return [...records].sort((firstRecord, secondRecord) => {
      const firstCreatedAt = firstRecord?.createdAt
        ? new Date(firstRecord.createdAt).getTime()
        : 0;
      const secondCreatedAt = secondRecord?.createdAt
        ? new Date(secondRecord.createdAt).getTime()
        : 0;

      return secondCreatedAt - firstCreatedAt;
    });
  }
}
