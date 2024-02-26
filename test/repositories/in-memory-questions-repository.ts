import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'

export class InMemoryQuestionsRepository implements QuestionsRepository {
  public items: Question[] = []

  async findById(questionId: string) {
    const question = this.items.find(
      (item) => item.id.toString() === questionId,
    )
    if (!question) return null
    return question
  }

  async findBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug)
    if (!question) return null
    return question
  }

  async create(question: Question) {
    this.items.push(question)
  }

  async save(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items[index] = question
  }

  async delete(question: Question) {
    const index = this.items.findIndex((item) => item.id === question.id)
    this.items.splice(index, 1)
  }
}
