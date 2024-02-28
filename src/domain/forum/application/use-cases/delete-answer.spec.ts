import { InMemoryAnswersRepository } from 'test/repositories/in-memory-answers-repository'

import { makeAnswer } from 'test/factories/make-answer'
import { DeleteAnswerUseCase } from './delete-answer'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryAnswersRepository: InMemoryAnswersRepository
// system under test
let sut: DeleteAnswerUseCase

describe('Delete Answer', () => {
  beforeEach(async () => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a answer', async () => {
    const idContent = 'answer-1'
    const answerContent = {
      authorId: new UniqueEntityID('author-1'),
    }
    const newAnswer = makeAnswer(answerContent, new UniqueEntityID(idContent))
    inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: answerContent.authorId?.toString(),
      answerId: idContent,
    })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a answer from another user', async () => {
    const idContent = 'answer-1'
    const answerContent = {
      authorId: new UniqueEntityID('author-1'),
    }
    const newAnswer = makeAnswer(answerContent, new UniqueEntityID(idContent))
    inMemoryAnswersRepository.create(newAnswer)

    const result = await sut.execute({
      authorId: 'author-2',
      answerId: idContent,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
