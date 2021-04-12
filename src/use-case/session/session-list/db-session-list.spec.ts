import { Session } from '@/entity/session'
import { SessionListRepository } from '../protocols/session-repository'
import { DbSessionList } from './db-session-list'
import faker from 'faker'

const mockReturnGetSessionList = mockReturnGetSessionListRepository()
describe('DbSessionList', () => {
  it('should call getSessionListRepository with correct params', async () => {
    const functionName = 'getSessionList'
    const expectedCalled = { active: true }

    const { sut, sessionRepositoryStub } = makeSut()
    const spy = jest.spyOn(sessionRepositoryStub, functionName)
    await sut.listActiveSessions()
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if getSessionListRepository throws', async () => {
    const functionName = 'getSessionList'
    const expectedThrow = new Error('any_session_repository_error')

    const { sut, sessionRepositoryStub } = makeSut()
    jest.spyOn(sessionRepositoryStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.listActiveSessions()
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should return all active sessions', async () => {
    const expectedReturn = mockReturnGetSessionList

    const { sut } = makeSut()
    const response = await sut.listActiveSessions()
    expect(response).toEqual(expectedReturn)
  })
})

type SutTypes = {
  sut: DbSessionList,
  sessionRepositoryStub: SessionListRepository
}

function makeSut (): SutTypes {
  const sessionRepositoryStub = makeSessionRepositoryStub()
  const sut = new DbSessionList(sessionRepositoryStub)

  return {
    sut,
    sessionRepositoryStub
  }
}

function makeSessionRepositoryStub (): SessionListRepository {
  class SessionRepositoryStub implements SessionListRepository {
    async getSessionList (options?: Partial<Session>): Promise<Session[]> {
      return mockReturnGetSessionList
    }
  }
  return new SessionRepositoryStub()
}

function mockReturnGetSessionListRepository (): Session[] {
  const sessions: Session[] = []
  for (let row = 12; row >= 0; row--) {
    sessions.push({
      id: faker.datatype.uuid(),
      ip: faker.internet.ip(),
      authenticationId: faker.datatype.uuid(),
      createdAt: faker.date.recent(),
      active: true,
      userAgent: faker.internet.userAgent(),
      dueDate: faker.date.future()
    })
  }
  return sessions
}
