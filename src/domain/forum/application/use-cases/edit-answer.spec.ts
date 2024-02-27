import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { makeAnswer } from 'test/factories/make-answer'
import { EditAnswerUseCase } from './edit-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// system under test
let sut: EditAnswerUseCase

describe('Edit Answer', () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to edit a answer', async () => {
    const idContent = 'answer-1'
    const answerContent = {
      authorId: new UniqueEntityID('author-1'),
    }
    const newAnswer = makeAnswer(answerContent, new UniqueEntityID(idContent))
    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      answerId: idContent,
      content: 'Test content',
      authorId: answerContent.authorId?.toValue(),
    })

    expect(inMemoryAnswersRepository.items[0]).toMatchObject({
      content: 'Test content',
    })
  })

  it('should not be able to edit a answer from another user', async () => {
    const idContent = 'answer-1'
    const answerContent = {
      authorId: new UniqueEntityID('author-1'),
    }
    const newAnswer = makeAnswer(answerContent, new UniqueEntityID(idContent))
    inMemoryAnswersRepository.create(newAnswer)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        answerId: idContent,
        content: 'Test content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
