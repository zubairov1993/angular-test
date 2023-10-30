import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { MatDialogModule } from '@angular/material/dialog';

import { QuestionsComponent } from "./questions.component";
import { ShowQuestionComponent } from './components/show-question/show-question.component';
import { ViewAnswerComponent } from './components/view-answer/view-answer.component';
import { QuestionManagerComponent } from './components/question-manager/question-manager.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [QuestionsComponent, ShowQuestionComponent, ViewAnswerComponent, QuestionManagerComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild([
      {
        path: '',
        component: QuestionsComponent,
      }
    ]),
  ],
  providers: []
})
export class QuestionsModule {}
