import { Session } from '@/entity/session'
import { SessionByIdRepository } from '@/use-case/session/protocols/session-by-id-repository'
import { DbSessionById } from '@/use-case/session/session-by-id/db-session-by-id'

describe('DbSessionById', () => {
  it('should call get session by id repository', async () => {
    const functionName = 'getById'
    const expectedCalled = 'any_session_id'
    const { sut, sessionByIdStub } = makeSut()
    const spy = jest.spyOn(sessionByIdStub, functionName)
    await sut.getById(expectedCalled)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it.todo('should throw if get session by id repository throws')
  it.todo('should throw session not found if session by id return null or empty')
  it.todo('should return a session on success')
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

function makeSessionByIdRepositoryStub (): SessionByIdRepository {
  class SessionByIdRepositoryStub implements SessionByIdRepository {
    async getById (sessionId: string): Promise<Session> {
      return null
    }
  }
  return new SessionByIdRepositoryStub()
}
