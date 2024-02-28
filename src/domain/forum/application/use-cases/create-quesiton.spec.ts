import { InMemoryQuestionsRepository } from 'test/repositories/in-memory-questions-repository'
import { CreateQuestionUseCase } from './create-question'

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
// system under test
let sut: CreateQuestionUseCase

describe('Create Question', () => {
  beforeEach(async () => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a question', async () => {
    const result = await sut.execute({
      authorId: '1',
      title: 'New question',
      content: 'Question content',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryQuestionsRepository.items.length).toBe(1)
    expect(inMemoryQuestionsRepository.items[0]).toEqual(result.value?.question)
    expect(inMemoryQuestionsRepository.items[0].id).toEqual(
      result.value?.question.id,
    )
  })
})
