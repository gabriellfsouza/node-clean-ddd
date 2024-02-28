import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { NotAllowedError } from './errors/not-allowed-error'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: DeleteQuestionUseCase

describe('Delete Question', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question', async () => {
    const idContent = 'question-1'
    const questionContent = {
      authorId: new UniqueEntityID('author-1'),
    }
    const newQuestion = makeQuestion(
      questionContent,
      new UniqueEntityID(idContent),
    )
    inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: questionContent.authorId?.toString(),
      questionId: idContent,
    })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a question from another user', async () => {
    const idContent = 'question-1'
    const questionContent = {
      authorId: new UniqueEntityID('author-1'),
    }
    const newQuestion = makeQuestion(
      questionContent,
      new UniqueEntityID(idContent),
    )
    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: idContent,
    })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})
