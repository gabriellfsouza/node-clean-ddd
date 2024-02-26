import type { Question } from '../../enterprise/entities/question'

export interface QuestionsRepository {
  findById(questionId: string): Promise<Question | null>
  findBySlug(slug: string): Promise<Question | null>
  create(answer: Question): Promise<void>
  save(question: Question): Promise<void>
  delete(question: Question): Promise<void>
}
