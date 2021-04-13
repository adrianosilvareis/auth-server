import { Session } from '@/entity/session'
import { SessionByIdRepository } from '@/use-case/session/protocols/session-by-id-repository'
import { DbSessionById } from '@/use-case/session/session-by-id/db-session-by-id'
import { mockReturnSession } from '@/__tests__/entity/mock/sessions'

describe('DbSessionById', () => {
  it('should call get session by id repository', async () => {
    const functionName = 'getById'
    const expectedCalled = 'any_session_id'
    const { sut, sessionByIdStub } = makeSut()
    const spy = jest.spyOn(sessionByIdStub, functionName)
    await sut.getById(expectedCalled)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if get session by id repository throws', async () => {
    const functionName = 'getById'
    const data = 'any_session_id'
    const expectedThrow = new Error('any_session_id_error')
    const { sut, sessionByIdStub } = makeSut()
    jest.spyOn(sessionByIdStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.getById(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should throw session not found if session by id return null or empty', async () => {
    const functionName = 'getById'
    const data = 'any_session_id'
    const expectedThrow = new Error('Session not found')
    const { sut, sessionByIdStub } = makeSut()
    jest.spyOn(sessionByIdStub, functionName).mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.getById(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should return a session on success', async () => {
    const data = 'any_session_id'
    const expectedReturn = mockedSession
    const { sut } = makeSut()
    const response = await sut.getById(data)
    expect(response).toEqual(expectedReturn)
  })
})

type SutTypes = {
  sut: DbSessionById,
  sessionByIdStub: SessionByIdRepository
}

function makeSut ():SutTypes {
  const sessionByIdStub = makeSessionByIdRepositoryStub()
  const sut = new DbSessionById(sessionByIdStub)

  return {
    sut,
    sessionByIdStub
  }
}

const mockedSession = mockReturnSession()
function makeSessionByIdRepositoryStub (): SessionByIdRepository {
  class SessionByIdRepositoryStub implements SessionByIdRepository {
    async getById (sessionId: string): Promise<Session> {
      return mockedSession
    }
  }
  return new SessionByIdRepositoryStub()
}
