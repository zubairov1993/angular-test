import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { QuestionService } from './services/questions.service';

import { ShowQuestionComponent } from './components/show-question/show-question.component';
import { QuestionManagerComponent } from './components/question-manager/question-manager.component';

import { QuestionI } from './interfaces/questions.interface';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionsComponent implements OnInit, OnDestroy {
  public questionService = inject(QuestionService);
  private dialog = inject(MatDialog);
  private arraySubscription$: Subscription[] = [];
  private router = inject(Router);

  public isAdmin = false;

  ngOnInit(): void {
    this.questionService.getQuestions()
    setTimeout(() => {
      console.log('this.questionService.questionsData$: ', this.questionService.questionsData$.value.length);
    }, 2000);
    if (this.router.url.includes('admin')) this.isAdmin = true;
  }

  add() {
    this.openQuestionManager(null)
  }

  edit(event: any, question: QuestionI) {
    event.stopPropagation();
    event.preventDefault();
    this.openQuestionManager(question)
  }

  openQuestionManager(question: QuestionI | null): void {
    const dialog = this.dialog.open(QuestionManagerComponent, {
      width: '90%',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '80%',
      panelClass: 'question-manager',
      autoFocus: false,
      data: question
    }).afterClosed().subscribe((result: { question: QuestionI, action: string }) => {
      console.log('result: ', result);
      if (result.action === 'add') this.addQuestion(result.question)
      if (result.action === 'update') this.updateQuestion(result.question)
    })

    this.arraySubscription$.push(dialog)
  }

  addQuestion(data: QuestionI): void {
    this.questionService.addQuestion(data).subscribe(response => {
      console.log('response: addQuestion', response);
    })
  }

  updateQuestion(data: QuestionI): void {
    this.questionService.updateQuestion(data.key!, data).subscribe(response => {
      console.log('response: updateQuestion', response);
    })
  }

  openShowQuestion(index: number): void {
    const question = this.questionService.getQuestionById(index)
    const dialog = this.dialog.open(ShowQuestionComponent, {
      width: '90%',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '80%',
      panelClass: 'show_question',
      autoFocus: false,
      data: question
    }).afterClosed().subscribe((result: string) => {
      if (result) {
        if (result === 'prev') this.openShowQuestion(index - 1);
        if (result === 'next') this.openShowQuestion(index + 1);
      }
    })
    this.arraySubscription$.push(dialog)
  }

  ngOnDestroy(): void {
    this.arraySubscription$.forEach(sub => {
      if (sub) sub.unsubscribe();
    });
  }
}
