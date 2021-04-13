import { SessionCheckValidation } from '@/entity/session'

export class DbSessionCheckValidation implements SessionCheckValidation {
  async check (sessionId: string, userAgent: string): Promise<boolean> {
    return null
  }
}
