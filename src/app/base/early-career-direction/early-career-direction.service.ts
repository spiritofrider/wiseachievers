import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface EarlyCareerDirectionQuestion {
  id: number;
  question: string;
  quote: string;
  quoteAuthor: string;
  options?: string[];
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
    title: "Career Guidance Assessment",
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
        quote: "The future depends on what you do today.",
        quoteAuthor: "Mahatma Gandhi",
      },
      {
        id: 2,
        question:
          "Is my current job helping me build skills that align with my future career goals?",
        quote: "The expert in anything was once a beginner.",
        quoteAuthor: "Helen Hayes",
      },
      {
        id: 3,
        question:
          "Do I feel confident in my ability to switch roles or industries if needed?",
        quote: "Life is either a daring adventure or nothing.",
        quoteAuthor: "Helen Keller",
        options: [
          "Not confident",
          "Slightly confident",
          "Somewhat confident",
        ],
      },
      {
        id: 4,
        question:
          "Do I actively seek opportunities (projects, learning, networking) to grow in my career?",
        quote: "Opportunities don't happen, you create them.",
        quoteAuthor: "Chris Grosser",
        options: ["Rarely", "Sometimes", "Often", "Very consistently"],
      },
      {
        id: 5,
        question:
          "Do I feel fairly compensated for the work and value I bring to my organization?",
        quote:
          "Try not to become a person of success, but rather try to become a person of value.",
        quoteAuthor: "Albert Einstein",
      },
      {
        id: 6,
        question:
          "Do I receive enough feedback and mentorship to improve professionally?",
        quote:
          "Mentoring is a brain to pick, an ear to listen, and a push in the right direction.",
        quoteAuthor: "John C. Crosby",
        options: [
          "No support",
          "Limited support",
          "Helpful support",
          "Strong support",
        ],
      },
      {
        id: 7,
        question:
          "Am I satisfied with the work-life balance my current job provides?",
        quote:
          "Never get so busy making a living that you forget to make a life.",
        quoteAuthor: "Dolly Parton",
        options: [
          "Very dissatisfied",
          "Dissatisfied",
          "Satisfied",
          "Very satisfied",
        ],
      },
      {
        id: 8,
        question:
          "Do I regularly reflect on whether my current job aligns with my personal values and interests?",
        quote: "The unexamined life is not worth living.",
        quoteAuthor: "Socrates",
      },
      {
        id: 9,
        question:
          "Do I feel secure in my job and confident about my employability in the market?",
        quote: "The best way to predict the future is to create it.",
        quoteAuthor: "Peter Drucker",
      },
      {
        id: 10,
        question:
          "Do I have a plan (even if loosely defined) for where I want to be in the next 3-5 years professionally?",
        quote: "A goal without a plan is just a wish.",
        quoteAuthor: "Antoine de Saint-Exupery",
        options: [
          "No plan yet",
          "Early ideas",
          "Loose plan",
          "Clear plan",
          "Detailed roadmap",
        ],
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
