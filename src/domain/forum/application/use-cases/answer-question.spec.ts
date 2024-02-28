import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'
import { AnswerQuestionUseCase } from './answer-question'
import { Answer } from '../../enterprise/entities/answer'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// system under test
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content: "Answer's content",
    })

    const { answer } = result.value as { answer: Answer }

    expect(result.isRight()).toBe(true)

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0].content).toEqual(
      "Answer's content",
    )
    expect(inMemoryAnswersRepository.items[0].id).toEqual(answer.id)
  })
})
