export interface QuestionI {
  key?: string;
  question: string
  level: string
  index: number
  isCompleted: boolean
  isCorrectAnswer: boolean
  links: string[]
  answers: AnswerI[]
}

export interface AnswerI {
  answer: string
  isSelect: boolean
  isCorrect: boolean
}
