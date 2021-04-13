import { Session, SessionById } from '@/entity/session'
import { DbSessionCheckValidation } from '@/use-case/session/session-validation/db-session-check-validation'

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
  it.todo('should return true if session not found')
  it.todo('should return true if session is inactive')
  it.todo('should return true if due date is greater than or equal to current date')
  it.todo('should return true if the user agent is not the same as the session agent')
  it.todo('should return false if it passes all checks')
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
      return null
    }
  }
  return new SessionByIdStub()
}
