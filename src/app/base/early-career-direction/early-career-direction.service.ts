import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { delay } from "rxjs/operators";
import { environment } from "src/environments/environment";

export interface EarlyCareerDirectionQuestion {
  id: number;
  question: string;
  questionTitle: string;
  quote: string;
  quoteAuthor: string;
  options?: EarlyCareerDirectionOption[];
}

export interface EarlyCareerDirectionOption {
  question: string;
  marks: number;
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
  selectedMarks: number | null;
}

export interface EarlyCareerDirectionSubmissionPayload {
  title: string;
  description: string;
  submittedAt: string;
  responses: EarlyCareerDirectionSubmissionResponse[];
}

export interface EarlyCareerDirectionAiReport {
  reportId: string;
  overallSummary: string;
  strengths: string[];
  improvementAreas: string[];
  nextSteps: string[];
}

export interface EarlyCareerDirectionAiReportResponse {
  success: boolean;
  reportId: string;
  report: EarlyCareerDirectionAiReport;
}

@Injectable({
  providedIn: "root",
})
export class EarlyCareerDirectionService {
  private readonly assessment: EarlyCareerDirectionAssessment = {
    title: "Career Progress Assessment",
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
        questionTitle: "Goal Setting",
        question:
          "Goal setting is a mandatory and important aspect for success in your career.",
        quote: "The future depends on what you do today.",
        quoteAuthor: "Mahatma Gandhi",
        options: [
          {
            question: "I have set all my goals and am clear about achieveing them",
            marks: 1,
          },
          {
            question: "I have set my goals but have no stratergy in place to achieve them",
            marks: 0,
          },
          {
            question: "I have not set any goals as I do not understand how by just setting a goal it will help me in achieving it. ",
            marks: -1,
          },
        ],
      },
      {
        id: 2,
        questionTitle: "Focus",
        question:
          "Without focus it is futile to try to achieve success in any career",
        quote: "Concentrate all your thoughts upon the work in hand.",
        quoteAuthor: "Alexander Graham Bell",
        options: [
          {
            question: "Focus comes easily to me and I am totally focused in my career",
            marks: 1,
          },
          {
            question: "I understand focus but am not able to achieve the required level of focus in my career",
            marks: 0,
          },
          {
            question: "What is focus, Why do I need focus and how do I achieve it",
            marks: -1,
          },
        ],
      },
      {
        id: 3,
        questionTitle: "Courage",
        question:
          "The ability to take risk is directly propotional to success in your career. Often misunderstood to be a trait you have to be born with but is not so.",
        quote: "Life is either a daring adventure or nothing.",
        quoteAuthor: "Helen Keller",
        options: [
          {
            question: "I know what is risk taking and most of the time I come out winners",
            marks: 1,
          },
          {
            question: "I respect courage but am afraid to take major risk",
            marks: 0,
          },
          {
            question: "I do not believe in taking any risk as I am afraid of the consequences",
            marks: -1,
          },
        ],
      },
      {
        id: 4,
        questionTitle: "Ability to face Criticism",
        question:
          "Criticism if not handled correctly is the fastest route to the destruction of your career",
        quote: "Criticism may not be agreeable, but it is necessary.",
        quoteAuthor: "Winston Churchill",
        options: [
          {
            question: "I can handle criticism very well. It is not an issue I face",
            marks: 1,
          },
          {
            question: "I am aware of the need to face criticism but am afraid of it's destructive power",
            marks: 0,
          },
          {
            question: "I work in such ways that I do not give anybody an oppurtunity to criticise me at all",
            marks: -1,
          },
        ],
      },
      {
        id: 5,
        questionTitle: "Confidence",
        question:
          "In personal life as well as in any career, confidence is the key word between success and failure.",
        quote: "Believe you can and you're halfway there.",
        quoteAuthor: "Theodore Roosevelt",
        options: [
          {
            question: "I could call myself a confident person in many aspects",
            marks: 1,
          },
          {
            question: "My confidence is with me most of the time, but sometimes is lost when I need it most",
            marks: 0,
          },
          {
            question: "Confidence is something I lack.",
            marks: -1,
          },
        ],
      },
      {
        id: 6,
        questionTitle: "Knowledge of your field of work",
        question:
          "Qualifications, Experience, Expertise is the name of the game. This is the key that opens doors",
        quote: "An investment in knowledge pays the best interest.",
        quoteAuthor: "Benjamin Franklin",
        options: [
          {
            question: "I am well qualified and experienced for my work",
            marks: 1,
          },
          {
            question: "I am sufficiently qualified and experienced but am not going anywhere in my career",
            marks: 0,
          },
          {
            question: "I need more qualification and experience for the work which I am doing",
            marks: -1,
          },
        ],
      },
      {
        id: 7,
        questionTitle: "Skills",
        question:
          "Relevant hard and soft skills are required for chosen work area. May or may not be related to qualifications and experience",
        quote: "The expert in anything was once a beginner.",
        quoteAuthor: "Helen Hayes",
        options: [
          {
            question: "I am a skilled individual and use my skills for my work",
            marks: 1,
          },
          {
            question: "I realise the importance of skills and am working at obtaining more skills required for my work",
            marks: 0,
          },
          {
            question: "I lack the required hard and soft skills for my work",
            marks: -1,
          },
        ],
      },
      {
        id: 8,
        questionTitle: "Self Worth",
        question:
          "Worthiness of self is often underestimated. Persons lacking self worth may find work difficult in a team. Lack of self worth can severly retard the ability to delegate work.",
        quote: "No one can make you feel inferior without your consent.",
        quoteAuthor: "Eleanor Roosevelt",
        options: [
          {
            question: "I consider my self a worthy person",
            marks: 1,
          },
          {
            question: "Self worth is very important. I am looking for areas on how to improve my self worth",
            marks: 0,
          },
          {
            question: "I lack self worth",
            marks: -1,
          },
        ],
      },
      {
        id: 9,
        questionTitle: "Passion",
        question:
          "Being passionate about what you are doing is of utmost importance otherwise it could be said that you are in the wrong career",
        quote: "The only way to do great work is to love what you do.",
        quoteAuthor: "Steve Jobs",
        options: [
          {
            question: "I abosolutely enjoy my work. I am in a career which is the right one for me",
            marks: 1,
          },
          {
            question: "I enjoy some aspects of my work and hate some aspects",
            marks: 0,
          },
          {
            question: "I have no liking for the work that I have to do for my income",
            marks: -1,
          },
        ],
      },
      {
        id: 10,
        questionTitle: "Ambition and competitive nature",
        question:
          "Clear distintive line should be defined between positive ambition and blind ambition.  Blind ambition creates a feel good emotion but can lead to severe loss",
        quote: "A man's worth is no greater than his ambitions.",
        quoteAuthor: "Marcus Aurelius",
        options: [
          {
            question: "I am an ambitious person. I think ambition is required for any sort of achievement. ",
            marks: 1,
          },
          {
            question: "I have some ambition but I not sure how to channalise it",
            marks: 0,
          },
          {
            question: "I lack any sort of ambition. I am happy with what I am, where I am and what income I get out of it.  ",
            marks: -1,
          },
        ],
      },
      {
        id: 11,
        questionTitle: "Practical Foresight",
        question:
          "The importance of practical foresight can never be underestimated. Without that you may be moving in a blind alley. ",
        quote: "The best way to predict the future is to create it.",
        quoteAuthor: "Peter Drucker",
        options: [
          {
            question: "I could say that I have good foresight. I can foresee the good and bad consequenses of the actions I take",
            marks: 1,
          },
          {
            question: "Practical Foresight is very important but it does not come to me naturally and the future is unclear most of the time",
            marks: 0,
          },
          {
            question: "I cannot forsee anything, judging the outcome of things is very confusing to me",
            marks: -1,
          },
        ],
      },
      {
        id: 12,
        questionTitle: "Inherent Qualities and Drive",
        question:
          "What are your inherent qualities, what drives you are the deciding factors in how far you will go in life",
        quote: "Knowing yourself is the beginning of all wisdom.",
        quoteAuthor: "Aristotle",
        options: [
          {
            question: "Compared to many other people I have great inherent qualities and a positive drive which has surely helped me in my career",
            marks: 1,
          },
          {
            question: "I think I do have some inherent qualities and drive but I do not know how that would help me in my career",
            marks: 0,
          },
          {
            question: "I do not have any inherent qualities and drive which I see in other people. I have a weak outlook",
            marks: -1,
          },
        ],
      },
      {
        id: 13,
        questionTitle: "Communication and Team Work",
        question:
          "The abilitiy to communicate well and be a team player is one of the utmost requirements for career success",
        quote: "Alone we can do so little; together we can do so much.",
        quoteAuthor: "Helen Keller",
        options: [
          {
            question: "I am a great communicator, I work best in a team",
            marks: 1,
          },
          {
            question: "I communicate enough to get my work done. I realise the importance of team work ",
            marks: 0,
          },
          {
            question: "I do not see the need to be very communicative. Most of the time I work best alone",
            marks: -1,
          },
        ],
      },
      {
        id: 14,
        questionTitle: "Awareness",
        question:
          "Situational and circumstantial awareness is an absolute necessity, also inculdes awareness of pros and cons of chosen field of work. Better awareness leads to right decision making capacity",
        quote: "Awareness is the greatest agent for change.",
        quoteAuthor: "Eckhart Tolle",
        options: [
          {
            question: "I keep myself well aware of situations and circumstances surrounding me. ",
            marks: 1,
          },
          {
            question: "I am aware of things but fail to use them to grab opportunites or to avoid dangers",
            marks: 0,
          },
          {
            question: "Awareness does not come naturally to me.",
            marks: -1,
          },
        ],
      },
      {
        id: 15,
        questionTitle: "External Forces and Circumstances",
        question:
          "External forces and circumstances are not in your control. How you handle them goes a long way in deciding success in career and life",
        quote:
          "You may not control all the events that happen to you, but you can decide not to be reduced by them.",
        quoteAuthor: "Maya Angelou",
        options: [
          {
            question: "I am not facing many situations which are not in my control. ",
            marks: 1,
          },
          {
            question: "I do realise that everybody has external forces and circumstances to manage. I do manage a few but am also controlled by a few",
            marks: 0,
          },
          {
            question: "I am very much bound by situations not caused by me and not in my control. I never have a free hand in my work or my dealings",
            marks: -1,
          },
        ],
      },
    ],
    createdAt: {
      $date: "2026-04-23T00:00:00Z",
    },
  };
  private latestSubmission: EarlyCareerDirectionSubmissionPayload | null = null;

  constructor(private http: HttpClient) {}

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

  generateAiReport(
    results: EarlyCareerDirectionSubmissionPayload
  ): Observable<EarlyCareerDirectionAiReportResponse> {
    if (!environment.aiReportFunctionUrl) {
      return throwError(
        "AI report Lambda URL is missing in the environment config."
      );
    }

    return this.http.post<EarlyCareerDirectionAiReportResponse>(
      environment.aiReportFunctionUrl,
      { results }
    );
  }
}
