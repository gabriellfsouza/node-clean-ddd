import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { GetQuestionBySlugUseCase } from './get-question-by-slug'
import { makeQuestion } from 'test/factories/make-question'
import { Slug } from '../../enterprise/entities/value-objects/slug'
import { Question } from '../../enterprise/entities/question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: GetQuestionBySlugUseCase

describe('Get Question By Slug', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionBySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by slug', async () => {
    const slugContent = 'example-question'
    const newQuestion = makeQuestion({
      slug: Slug.create(slugContent),
    })
    inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      slug: slugContent,
    })

    const { question } = result.value as { question: Question }
    expect(result.isRight()).toBe(true)

    expect(question.id).toBeTruthy()
    expect(question.title).toEqual(newQuestion.title)
  })
})
