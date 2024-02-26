import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'
import { DeleteQuestionUseCase } from './delete-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

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
      authorId: new UniqueEntityId('author-1'),
    }
    const newQuestion = makeQuestion(
      questionContent,
      new UniqueEntityId(idContent),
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
      authorId: new UniqueEntityId('author-1'),
    }
    const newQuestion = makeQuestion(
      questionContent,
      new UniqueEntityId(idContent),
    )
    inMemoryQuestionsRepository.create(newQuestion)

    await expect(() =>
      sut.execute({
        authorId: 'author-2',
        questionId: idContent,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
