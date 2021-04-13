import { Session, SessionById } from '@/entity/session'

export class DbSessionById implements SessionById {
  async getById (sessionId: string): Promise<Session> {
    return null
  }
}
