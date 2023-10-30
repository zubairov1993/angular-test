import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { AnswerI } from '../../interfaces/questions.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-answer',
  templateUrl: './view-answer.component.html',
  styleUrls: ['./view-answer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ViewAnswerComponent implements OnInit {
  answerData = inject(MAT_DIALOG_DATA) as { answer: AnswerI, correctAnswer: AnswerI, links: string[] };
  dialogRef = inject(MatDialogRef);
  isShowBadAnswer = false;

  ngOnInit(): void {
    console.log('answerData', this.answerData);
    this.isShowBadAnswer = !this.answerData.answer.isCorrect;
    if (this.isShowBadAnswer) {

    }
  }

  close(): void {
    this.dialogRef.close();
  }

}
