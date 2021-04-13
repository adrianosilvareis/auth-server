import { Session, SessionById } from '@/entity/session'
import { DbSessionCheckValidation } from '@/use-case/session/session-validation/db-session-check-validation'
import faker from 'faker'
import { mockedSession } from '../stubs/sessions'

describe('DbSessionCheckValidation', () => {
  it('should call get session by id', async () => {
    const functionName = 'getById'
    const expectedCalled = 'any_session_id'
    const { sut, sessionByIdSut } = makeSut()
    const spy = jest.spyOn(sessionByIdSut, functionName)
    await sut.check('any_session_id', 'any_agent_user')
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if get session by id throws', async () => {
    const functionName = 'getById'
    const expectedThrow = new Error('any_get_session_by_id_error')
    const { sut, sessionByIdSut } = makeSut()
    jest.spyOn(sessionByIdSut, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.check('any_session_id', 'any_agent_user')
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should return true if session not found', async () => {
    const functionName = 'getById'
    const { sut, sessionByIdSut } = makeSut()
    jest.spyOn(sessionByIdSut, functionName).mockReturnValueOnce(Promise.resolve(null))
    const response = await sut.check('any_session_id', 'any_agent_user')
    expect(response).toBeTruthy()
  })
  it('should return true if session is inactive', async () => {
    const functionName = 'getById'
    const expectedResponses = Object.assign({}, mockedSession, { active: false })
    const { sut, sessionByIdSut } = makeSut()
    jest.spyOn(sessionByIdSut, functionName).mockReturnValueOnce(Promise.resolve(expectedResponses))
    const response = await sut.check('any_session_id', 'any_agent_user')
    expect(response).toBeTruthy()
  })
  it('should return true if due date is greater than or equal to current date', async () => {
    const functionName = 'getById'
    const pastDate = faker.date.past()
    const expectedResponses = Object.assign({}, mockedSession, { dueDate: pastDate })
    const { sut, sessionByIdSut } = makeSut()
    jest.spyOn(sessionByIdSut, functionName).mockReturnValueOnce(Promise.resolve(expectedResponses))
    const response = await sut.check('any_session_id', 'any_agent_user')
    expect(response).toBeTruthy()
  })
  it('should return true if the user agent is not the same as the session agent', async () => {
    const { sut } = makeSut()
    const response = await sut.check('any_session_id', 'any_agent_user')
    expect(response).toBeTruthy()
  })
  it('should return false if it passes all checks', async () => {
    const { sut } = makeSut()
    const response = await sut.check('any_session_id', mockedSession.userAgent)
    expect(response).toBeFalsy()
  })
})

type SutTypes = {
  sut: DbSessionCheckValidation,
  sessionByIdSut: SessionById
}
function makeSut (): SutTypes {
  const sessionByIdSut = makeSessionByIdStub()
  const sut = new DbSessionCheckValidation(sessionByIdSut)
  return {
    sut,
    sessionByIdSut
  }
}

function makeSessionByIdStub (): SessionById {
  class SessionByIdStub implements SessionById {
    async getById (sessionId: string): Promise<Session> {
      return mockedSession
    }
  }
  return new SessionByIdStub()
}
