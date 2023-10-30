import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { ViewAnswerComponent } from '../view-answer/view-answer.component';

import { AnswerI, QuestionI } from '../../interfaces/questions.interface';

@Component({
  selector: 'app-show-question',
  templateUrl: './show-question.component.html',
  styleUrls: ['./show-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowQuestionComponent {
  questionData = inject(MAT_DIALOG_DATA) as QuestionI;
  isSelectAnswer: boolean = false;
  dialog = inject(MatDialog);
  dialogRef = inject(MatDialogRef);

  selectAnswer(selectedAnswer: AnswerI) {
    this.questionData?.answers.forEach(answer => {
      if (answer === selectedAnswer) answer.isSelect = !selectedAnswer.isSelect;
      else answer.isSelect = false;
    });
    this.isSelectAnswer = this.questionData?.answers.some(answer => answer.isSelect === true);
  }

  answerToQuestion() {
    const selectedAnswer = this.questionData?.answers.find(answer => answer.isSelect === true);
    const correctAnswer = this.questionData?.answers.find(answer => answer.isCorrect === true);

    this.dialog.open(ViewAnswerComponent, {
      width: '70%',
      maxWidth: '100%',
      height: 'auto',
      maxHeight: '80%',
      panelClass: 'view_answer',
      autoFocus: false,
      data: { answer: selectedAnswer, correctAnswer, links: this.questionData?.links }
    });
  }

  goToOtherQuestion(value: string): void {
    this.dialogRef.close(value);
  }
}
