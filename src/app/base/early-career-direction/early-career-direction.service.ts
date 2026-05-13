import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay } from "rxjs/operators";

export interface EarlyCareerDirectionQuestion {
  id: number;
  question: string;
  questionTitle: string;
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
        questionTitle: "Goal Setting",
        question:
          "Goal setting is a madatory and important aspect for success in your career.",
        quote: "The future depends on what you do today.",
        quoteAuthor: "Mahatma Gandhi",
        options: [
          "I have set all my goals and am clear about achieveing them",
          "I have set my goals but have no stratergy in place to achieve them",
          "I have not set any goals as I do not understand how by just setting a goal it will help me in achieving it. ",
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
          "Focus comes eaisly to me and I am totally focused in my career",
          "I understand focus but am not able to achieve the required level of focus in my career",
          "What is focus, Why do I need focus and how do I achieve it",
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
          "I know what is risk taking and most of the time I come out winners",
          "I respect courage but am afraid to take major risk",
          "I do not believe in taking any risk as I am afraid of the consequences",
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
          "I can handle criticism very well. It is not an issue I face",
          "I am aware of the need to face criticism but am afraid of it's destructive power",
          "I work in such ways that I do not give anybody an oppurtunity to criticise me at all",
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
          "I could call myself a confident person in many aspects",
          "My confidence is with me most of the time, but sometimes is lost when I need it most",
          "Confidence is something I lack.",
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
          "I am well qualified and experienced for my work",
          "I am sufficiently qualified and experienced but am not going anywhere in my career",
          "I need more qualification and experience for the work which I am doing",
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
          "I am a skilled individual and use my skills for my work",
          "I realise the importance of skills and am working at obtaining more skills required for my work",
          "I lack the required hard and soft skills for my work",
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
          "I consider my self a worthy person",
          "Self worth is very important. I am looking for areas on how to improve my self worth",
          "I lack self worth",
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
          "I abosolutely enjoy my work. I am in a career which is the right one for me",
          "I enjoy some aspects of my work and hate some aspects",
          "I have no liking for the work that I have to do for my income",
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
          "I am an ambitious person. I think ambition is required for any sort of achievement. ",
          "I have some ambition but I not sure how to channalise it",
          "I lack any sort of ambition. I am happy with what I am, where I am and what income I get out of it.  ",
        ],
      },
      {
        id: 11,
        questionTitle: "Practical Foresight",
        question:
          "The importance of partical foresight can never be underestimated. Without that you may be moving in a blind alley. ",
        quote: "The best way to predict the future is to create it.",
        quoteAuthor: "Peter Drucker",
        options: [
          "I could say that I have good foresight. I can foresee the good and bad consequenses of the actions I take",
          "Practical Foresight is very important but it does not come to me naturally and the future is unclear most of the time",
          "I cannot forsee anything, judging the outcome of things is very confusing to me",
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
          "Compared to many other people I have great inherent qualities and a positive drive which has surely helped me in my career",
          "I think I do have some inherent qualities and drive but I do not know how that would help me in my career",
          "I do not have any inherent qualities and drive which I see in other people. I have a weak outlook",
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
          "I am a great communicator, I work best in a team",
          "I communicate enough to get my work done. I realise the importance of team work ",
          "I do not see the need to be very communicative. Most of the time I work best alone",
        ],
      },
      {
        id: 14,
        questionTitle: "Awareness",
        question:
          "Situational and circumstantial awareness is an absolute necessity, also inculdes awareness of pros and cons of chosen field of work. Better awareness leads to right decision making Capacity",
        quote: "Awareness is the greatest agent for change.",
        quoteAuthor: "Eckhart Tolle",
        options: [
          "I keep myself well aware of situations and circumstances surronding me. ",
          "I am aware of things but fail to use them to grab opportunites or to avoid dangers",
          "Awareness does not come naturally to me.",
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
          "I am not facing many situations which are not in my control. ",
          "I do realise that everybody has external forces and circumstances to manage. I do manage an few but am also controlled by a few",
          "I am very much bound by situations not caused by me and not in my control. I never have a free hand in my work or my dealings",
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
