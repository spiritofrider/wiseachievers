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
      "Have I clearly defined my career goals and the strategy needed to achieve them?",
    quote: "If one does not know to which port one is sailing, no wind is favorable.",
    quoteAuthor: "Seneca",
    options: [
      "My goals are clear and I know how to achieve them",
      "My goals are clear but I do not have a strategy yet",
      "I have not set clear goals yet",
    ],
  },
  {
    id: 2,
    question:
      "Am I able to stay focused on the work and habits that will help me succeed in my career?",
    quote: "My experience is what I agree to attend to.",
    quoteAuthor: "William James",
    options: [
      "Focus comes easily to me and I stay committed to my career",
      "I understand the importance of focus but struggle to maintain it",
      "I am not clear on why focus matters or how to develop it",
    ],
  },
  {
    id: 3,
    question:
      "Do I have the courage to take meaningful career risks when growth requires it?",
    quote: "Life is either a daring adventure or nothing.",
    quoteAuthor: "Helen Keller",
    options: [
      "I understand risk-taking and usually handle it well",
      "I respect courage but hesitate to take major risks",
      "I avoid risk because I fear the consequences",
    ],
  },
  {
    id: 4,
    question:
      "Can I handle criticism constructively without letting it damage my confidence or career progress?",
    quote: "The impediment to action advances action. What stands in the way becomes the way.",
    quoteAuthor: "Marcus Aurelius",
    options: [
      "I handle criticism well and learn from it",
      "I try to avoid situations where I may be criticized",
      "I am afraid of criticism and find it difficult to deal with",
    ],
  },
  {
    id: 5,
    question:
      "Do I have enough confidence in myself to take action, make decisions, and move forward professionally?",
    quote: "Believe you can and you're halfway there.",
    quoteAuthor: "Theodore Roosevelt",
    options: [
      "I consider myself confident in many areas",
      "My confidence depends heavily on the situation",
      "I lack confidence and often feel weak in my outlook",
    ],
  },
  {
    id: 6,
    question:
      "Do I have the qualifications, experience, and expertise needed to grow in my field of work?",
    quote: "An investment in knowledge pays the best interest.",
    quoteAuthor: "Benjamin Franklin",
    options: [
      "I am qualified and experienced for my work",
      "I have some qualifications and experience but feel stuck",
      "I need more qualifications and experience for my current work",
    ],
  },
  {
    id: 7,
    question:
      "Am I building the hard and soft skills required to succeed in my chosen career path?",
    quote: "The expert in anything was once a beginner.",
    quoteAuthor: "Helen Hayes",
    options: [
      "I have strong skills and use them well in my work",
      "I understand the importance of skills and am actively improving",
      "I lack some important hard or soft skills required for my work",
    ],
  },
  {
    id: 8,
    question:
      "Do I recognize my own worth and believe that I can contribute meaningfully at work?",
    quote: "No one can make you feel inferior without your consent.",
    quoteAuthor: "Eleanor Roosevelt",
    options: [
      "I consider myself a worthy and capable person",
      "I understand self-worth is important and want to improve it",
      "I struggle with low self-worth",
    ],
  },
  {
    id: 9,
    question:
      "Am I genuinely passionate about the work I do, or am I only doing it for income?",
    quote: "Where your talents and the needs of the world cross, there lies your vocation.",
    quoteAuthor: "Aristotle",
    options: [
      "I genuinely enjoy my work and feel I am in the right career",
      "I enjoy some parts of my work but dislike others",
      "I do not like the work I currently do for income",
    ],
  },
  {
    id: 10,
    question:
      "Do I have healthy ambition and a competitive drive that pushes me toward meaningful achievement?",
    quote: "A man's worth is no greater than his ambitions.",
    quoteAuthor: "Marcus Aurelius",
    options: [
      "I am ambitious and believe ambition is important for achievement",
      "I have some ambition but do not know how to channel it",
      "I lack ambition and feel satisfied with where I currently am",
    ],
  },
  {
    id: 11,
    question:
      "Do I have the practical foresight to judge the possible outcomes of my career decisions?",
    quote: "The best way to predict the future is to create it.",
    quoteAuthor: "Peter Drucker",
    options: [
      "I have good foresight and can judge consequences well",
      "I understand foresight is important but the future often feels unclear",
      "I find it difficult to foresee outcomes or judge consequences",
    ],
  },
  {
    id: 12,
    question:
      "Do I understand my inherent qualities and inner drive, and how they can help me progress in life and career?",
    quote: "Knowing yourself is the beginning of all wisdom.",
    quoteAuthor: "Aristotle",
    options: [
      "I have strong inherent qualities and a positive drive",
      "I have some qualities and drive but do not know how to use them",
      "I feel I lack the qualities and drive that I see in others",
    ],
  },
  {
    id: 13,
    question:
      "Am I able to communicate well and work effectively with others as part of a team?",
    quote: "Alone we can do so little; together we can do so much.",
    quoteAuthor: "Helen Keller",
    options: [
      "I communicate well and work best in a team",
      "I communicate enough to get work done and understand teamwork matters",
      "I prefer working alone and do not see much need for communication",
    ],
  },
  {
    id: 14,
    question:
      "Am I aware of the situations, opportunities, risks, and realities that affect my career decisions?",
    quote: "The unexamined life is not worth living.",
    quoteAuthor: "Socrates",
    options: [
      "I stay aware of the situations and circumstances around me",
      "I am aware of things but often fail to use that awareness well",
      "Awareness does not come naturally to me",
    ],
  },
  {
    id: 15,
    question:
      "How well do I handle external forces and circumstances that are outside my control?",
    quote: "You have power over your mind — not outside events. Realize this, and you will find strength.",
    quoteAuthor: "Marcus Aurelius",
    options: [
      "I am not facing many situations outside my control",
      "I manage some external circumstances but still feel controlled by others",
      "I feel bound by circumstances outside my control",
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
