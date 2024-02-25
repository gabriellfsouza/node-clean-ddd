import { AnswerQuestion } from "./answer-question";
import { Answer } from "../entities/answer";
import { AnswersRepository } from "../repositories/answers-repository";

const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer)=> {
    return
  }
}

describe('Answer Question', () => {
  test('create an answer', async ()=>{
    const answerQuestion = new AnswerQuestion(fakeAnswersRepository)

    const answer = await answerQuestion.execute({
      instructorId: '1',
      questionId: '1',
      content: 'Nova Resposta'
    })

    expect(answer.content).toEqual('Nova Resposta')
  })
})
