import { Session } from '@/entity/session'
import { SessionDropRepository } from '@/use-case/session/protocols/session-drop'
import { SessionListByAuthenticationRepository } from '@/use-case/session/protocols/session-repository'
import { mockReturnGetSessionListRepository } from '@/__tests__/entity/mock/sessions'

export const mockedReturnGetSessionListRepository = mockReturnGetSessionListRepository()
export function makeSessionListByAccountRepositoryStub ():SessionListByAuthenticationRepository {
  class SessionByAccountRepositoryStub implements SessionListByAuthenticationRepository {
    async getSessionsByAuthenticationId (accountId: string): Promise<Session[]> {
      return mockedReturnGetSessionListRepository
    }
  }
  return new SessionByAccountRepositoryStub()
}

export function makeSessionDropRepositoryStub ():SessionDropRepository {
  class SessionDropRepositoryStub implements SessionDropRepository {
    async drop (sessionId: string): Promise<void> {
      return null
    }
  }
  return new SessionDropRepositoryStub()
}
