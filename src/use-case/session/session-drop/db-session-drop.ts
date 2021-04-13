import { SessionDrop } from '@/entity/session'
import { AuthenticationByAccountRepository } from '../protocols/authentication-repository'
import { SessionDropRepository } from '../protocols/session-drop'

export class DbSessionDrop implements SessionDrop {
  constructor (
    private readonly authentication: AuthenticationByAccountRepository,
    private readonly session: SessionDropRepository
  ) {}

  async drop (sessionId: string, accountId: string): Promise<void> {
    const authentication = await this.authentication.getByAccountId(accountId)
    if (!authentication) throw new Error('account not found')
    await this.session.drop(sessionId)
    return null
  }
}
