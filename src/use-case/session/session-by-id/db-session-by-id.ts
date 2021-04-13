import { Session, SessionById } from '@/entity/session'
import { SessionByIdRepository } from '../protocols/session-by-id-repository'

export class DbSessionById implements SessionById {
  constructor (private readonly sessionById: SessionByIdRepository) {}

  async getById (sessionId: string): Promise<Session> {
    const session = await this.sessionById.getById(sessionId)
    if (!session) {
      throw new Error('Session not found')
    }
    return session
  }
}
