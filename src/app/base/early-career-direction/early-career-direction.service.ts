import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface EarlyCareerDirectionQuestion {
  id: number;
  question: string;
}

export interface EarlyCareerDirectionAssessment {
  title: string;
  description: string;
  scale: string[];
  questions: EarlyCareerDirectionQuestion[];
  createdAt: {
    $date: string;
  };
}

export interface EarlyCareerDirectionSubmissionResponse {
  id: number;
  question: string;
  selectedAnswer: string | null;
}

export interface EarlyCareerDirectionSubmissionPayload {
  title: string;
  description: string;
  submittedAt: string;
  responses: EarlyCareerDirectionSubmissionResponse[];
}

@Injectable({
  providedIn: "root",
})
export class EarlyCareerDirectionService {
  private readonly assessment: EarlyCareerDirectionAssessment = {
    title: "Career Guidance Assessment (3-5 Years Experience)",
    description:
      "Assessment for young professionals with 3-5 years of work experience to evaluate career clarity, growth, and satisfaction.",
    scale: [
      "Strongly Disagree",
      "Disagree",
      "Neutral",
      "Agree",
      "Strongly Agree",
    ],
    questions: [
      {
        id: 1,
        question:
          "Do I have a clear understanding of the long-term career path I want to pursue?",
      },
      {
        id: 2,
        question:
          "Is my current job helping me build skills that align with my future career goals?",
      },
      {
        id: 3,
        question:
          "Do I feel confident in my ability to switch roles or industries if needed?",
      },
      {
        id: 4,
        question:
          "Do I actively seek opportunities (projects, learning, networking) to grow in my career?",
      },
      {
        id: 5,
        question:
          "Do I feel fairly compensated for the work and value I bring to my organization?",
      },
      {
        id: 6,
        question:
          "Do I receive enough feedback and mentorship to improve professionally?",
      },
      {
        id: 7,
        question:
          "Am I satisfied with the work-life balance my current job provides?",
      },
      {
        id: 8,
        question:
          "Do I regularly reflect on whether my current job aligns with my personal values and interests?",
      },
      {
        id: 9,
        question:
          "Do I feel secure in my job and confident about my employability in the market?",
      },
      {
        id: 10,
        question:
          "Do I have a plan (even if loosely defined) for where I want to be in the next 3-5 years professionally?",
      },
    ],
    createdAt: {
      $date: "2026-04-23T00:00:00Z",
    },
  };
  private latestSubmission: EarlyCareerDirectionSubmissionPayload | null = null;

  getAssessment(): Observable<EarlyCareerDirectionAssessment> {
    return of(this.assessment).pipe(delay(250));
  }

  saveSubmission(
    payload: EarlyCareerDirectionSubmissionPayload
  ): Observable<EarlyCareerDirectionSubmissionPayload> {
    this.latestSubmission = payload;
    return of(payload).pipe(delay(250));
  }

  getLatestSubmission(): EarlyCareerDirectionSubmissionPayload | null {
    return this.latestSubmission;
  }
}
