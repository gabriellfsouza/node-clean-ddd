import { AnswersRepository } from '@/domain/forum/application/repositories/answers-repository'
import { Answer } from '@/domain/forum/enterprise/entities/answer'

export class InMemoryAnswersRepository implements AnswersRepository {
  public items: Answer[] = []

  async findById(answerId: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === answerId)
    if (!answer) return null
    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async save(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items[index] = answer
  }

  async delete(answer: Answer): Promise<void> {
    const index = this.items.findIndex((item) => item.id === answer.id)
    this.items.splice(index, 1)
  }
}
