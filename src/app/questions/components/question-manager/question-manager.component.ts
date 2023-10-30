import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { QuestionI } from '../../interfaces/questions.interface';

@Component({
  selector: 'app-question-manager',
  templateUrl: './question-manager.component.html',
  styleUrls: ['./question-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionManagerComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef);
  protected questionData = inject(MAT_DIALOG_DATA) as QuestionI;
  protected levels: string[] = ['junior', 'middle', 'senior'];

  protected form: FormGroup = this.formBuilder.group({
    question: ['111', [ Validators.required ]],
    correctAnswer: ['222', [ Validators.required ]],
    answer1: ['333', [ Validators.required ]],
    answer2: ['444', [ Validators.required ]],
    answer3: ['555', [ Validators.required ]],
    selectedLevel: ['junior', [ Validators.required ]],
    links: this.formBuilder.array([])
  })

  ngOnInit(): void {
    if (this.questionData) {
      this.form.controls['question'].setValue(this.questionData.question);
      const correctAnswer = this.questionData.answers.find(answer => answer.isCorrect === true);
      const incorrectAnswers = this.questionData.answers.filter(answer => answer.isCorrect === false);
      this.form.controls['correctAnswer'].setValue(correctAnswer?.answer);
      this.form.controls['answer1'].setValue(incorrectAnswers[0].answer);
      this.form.controls['answer2'].setValue(incorrectAnswers[1].answer);
      this.form.controls['answer3'].setValue(incorrectAnswers[2].answer);
      if (this.questionData?.links?.length !== 0) this.addLinks(this.questionData.links)
    }
  }

  // получение массива ссылок из формы
  get links(): FormArray {
    return this.form.get('links') as FormArray;
  }

  // добавление новой ссылки в форму
  addLink(): void {
    this.links.push(this.formBuilder.control(''));
  }

  // Метод для добавления ссылок из пришедших данных в форму
  addLinks(links: string[]) {
    const linksArray = this.form.get('links') as FormArray;
    if (links?.length !== 0) {
      links?.forEach(link => {
        linksArray.push(this.formBuilder.control(link));
      });
    }
  }

  // удаление ссылки
  removeLink(index: number): void {
    this.links.removeAt(index);
  }

  // отправка формы родительскому компоненту
  onSubmit(): void {
    let answers = []
    answers.push({ answer: this.form.value.correctAnswer, isSelect: false, isCorrect: true })
    answers.push({ answer: this.form.value.answer1, isSelect: false, isCorrect: false })
    answers.push({ answer: this.form.value.answer2, isSelect: false, isCorrect: false })
    answers.push({ answer: this.form.value.answer3, isSelect: false, isCorrect: false })

    const data = {
      key: this.questionData.key,
      question: this.form.value.question,
      level: this.form.value.selectedLevel,
      index: 0,
      isCompleted: false,
      isCorrectAnswer: false,
      links: this.form.value.links,
      answers: answers
    }
    let action = 'add';
    if (this.questionData) action = 'update';
    this.dialogRef.close({ question: data, action});
  }

  // закрытие диалога
  close(): void {
    this.dialogRef.close();
  }
}
