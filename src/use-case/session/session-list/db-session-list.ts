import { Session, SessionList } from '@/entity/session'
import { SessionFilters, SessionRepository } from '../protocols/session-repository'

export class DbSessionList implements SessionList {
  constructor (private readonly sessionRepository: SessionRepository) {}

  async listActiveSessions (): Promise<Session[]> {
    const sessionFilters = <SessionFilters> {
      active: true
    }
    return this.sessionRepository.getSessionList(sessionFilters)
  }
}
