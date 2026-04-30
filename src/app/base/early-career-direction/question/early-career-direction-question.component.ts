import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  EarlyCareerDirectionAssessment,
  EarlyCareerDirectionQuestion,
  EarlyCareerDirectionSubmissionPayload,
  EarlyCareerDirectionService,
} from "../early-career-direction.service";

@Component({
  selector: "app-early-career-direction-question",
  templateUrl: "./early-career-direction-question.component.html",
  styleUrls: ["./early-career-direction-question.component.scss"],
})
export class EarlyCareerDirectionQuestionComponent implements OnInit {
  questionNumber = 1;
  assessment: EarlyCareerDirectionAssessment | null = null;
  currentQuestion: EarlyCareerDirectionQuestion | null = null;
  selectedAnswers: { [questionId: number]: string } = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private earlyCareerDirectionService: EarlyCareerDirectionService
  ) {}

  ngOnInit(): void {
    this.earlyCareerDirectionService.getAssessment().subscribe((assessment) => {
      this.assessment = assessment;
      this.route.paramMap.subscribe((params) => {
        const routeQuestionNumber = Number(params.get("questionNumber"));
        this.syncQuestionState(routeQuestionNumber);
      });
    });
  }

  goToNextQuestion(): void {
    if (this.isLastQuestion()) {
      return;
    }

    const nextQuestion = this.questionNumber + 1;
    this.router.navigate([
      "/base/early-career-direction",
      `early-career-direction-question-${nextQuestion}`,
    ]);
  }

  goToPreviousQuestion(): void {
    const previousQuestion = Math.max(this.questionNumber - 1, 1);
    this.router.navigate([
      "/base/early-career-direction",
      `early-career-direction-question-${previousQuestion}`,
    ]);
  }

  isFirstQuestion(): boolean {
    return this.questionNumber <= 1;
  }

  isLastQuestion(): boolean {
    return (
      !!this.assessment &&
      this.questionNumber >= this.assessment.questions.length
    );
  }

  saveAnswer(scaleValue: string): void {
    if (!this.currentQuestion) {
      return;
    }

    this.selectedAnswers[this.currentQuestion.id] = scaleValue;
  }

  hasAnsweredCurrentQuestion(): boolean {
    return (
      !!this.currentQuestion &&
      !!this.selectedAnswers[this.currentQuestion.id]
    );
  }

  submitTest(): void {
    if (!this.assessment || !this.hasAnsweredCurrentQuestion()) {
      return;
    }

    const submissionPayload: EarlyCareerDirectionSubmissionPayload = {
      title: this.assessment.title,
      description: this.assessment.description,
      submittedAt: new Date().toISOString(),
      responses: this.assessment.questions.map((question) => ({
        id: question.id,
        question: question.question,
        selectedAnswer: this.selectedAnswers[question.id] || null,
      })),
    };

    console.log("Early Career Direction submission", submissionPayload);
    this.earlyCareerDirectionService
      .saveSubmission(submissionPayload)
      .subscribe(() => {
        this.router.navigate(["/base/early-career-direction/results"]);
      });
  }

  private syncQuestionState(routeQuestionNumber: number): void {
    if (!this.assessment) {
      return;
    }

    const totalQuestions = this.assessment.questions.length;
    const safeQuestionNumber =
      Number.isNaN(routeQuestionNumber) || routeQuestionNumber < 1
        ? 1
        : routeQuestionNumber > totalQuestions
        ? totalQuestions
        : routeQuestionNumber;

    this.questionNumber = safeQuestionNumber;
    this.currentQuestion =
      this.assessment.questions.find(
        (question) => question.id === safeQuestionNumber
      ) || this.assessment.questions[0];

    if (safeQuestionNumber !== routeQuestionNumber) {
      this.router.navigate([
        "/base/early-career-direction",
        `early-career-direction-question-${safeQuestionNumber}`,
      ]);
    }
  }
}
