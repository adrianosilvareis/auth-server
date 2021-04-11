import { Session } from '@/entity/session'
import { SessionRepository } from '../protocols/session-repository'
import { DbSessionList } from './db-session-list'

describe('DbSessionList', () => {
  it('should call getSessionListRepository with correct params', async () => {
    const functionName = 'getSessionList'
    const expectedCalled = { active: true }

    const { sut, sessionRepositoryStub } = makeSut()
    const spy = jest.spyOn(sessionRepositoryStub, functionName)
    await sut.listActiveSessions()
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it.todo('should throw if getSessionListRepository throws')
  it.todo('should return all active sessions')
})

type SutTypes = {
  sut: DbSessionList,
  sessionRepositoryStub: SessionRepository
}

function makeSut (): SutTypes {
  const sessionRepositoryStub = makeSessionRepositoryStub()
  const sut = new DbSessionList(sessionRepositoryStub)

  return {
    sut,
    sessionRepositoryStub
  }
}

function makeSessionRepositoryStub (): SessionRepository {
  class SessionRepositoryStub implements SessionRepository {
    async getSessionList (options?: Partial<Session>): Promise<Session[]> {
      return null
    }
  }
  return new SessionRepositoryStub()
}
