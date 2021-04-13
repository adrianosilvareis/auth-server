import { SessionById, SessionCheckValidation } from '@/entity/session'

export class DbSessionCheckValidation implements SessionCheckValidation {
  constructor (private readonly sessionById: SessionById) {}

  async check (sessionId: string, userAgent: string): Promise<boolean> {
    const session = await this.sessionById.getById(sessionId)
    if (!session) {
      return true
    }
    return null
  }
}
