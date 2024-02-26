import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'

import { makeQuestion } from 'test/factories/make-question'
import { EditQuestionUseCase } from './edit-question'
import { UniqueEntityId } from '@/core/entities/unique-entity-id'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: EditQuestionUseCase

describe('Edit Question', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question', async () => {
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
      questionId: idContent,
      title: 'Test question',
      content: 'Test content',
      authorId: questionContent.authorId?.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]).toMatchObject({
      title: 'Test question',
      content: 'Test content',
    })
  })

  it('should not be able to edit a question from another user', async () => {
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
        title: 'Test question',
        content: 'Test content',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
