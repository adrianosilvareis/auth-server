import { Session } from '@/entity/session'
import { SessionCountByAuthenticationRepository } from '@/use-case/session/protocols/session-count-by-authentication-repository'
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

export function makeSessionCountByAuthenticationRepository ():SessionCountByAuthenticationRepository {
  class SessionCountByAuthenticationStub implements SessionCountByAuthenticationRepository {
    async count (authenticationId: string): Promise<number> {
      return 0
    }
  }
  return new SessionCountByAuthenticationStub()
}
