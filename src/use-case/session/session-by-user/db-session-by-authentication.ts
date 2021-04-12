import { Session, SessionByAccount } from '@/entity/session'
import { AuthenticationByAccountRepository } from '../protocols/authentication-repository'
import { SessionListByAuthenticationRepository } from '../protocols/session-repository'

export class DbSessionByAccount implements SessionByAccount {
  constructor (
    private readonly authentication: AuthenticationByAccountRepository,
    private readonly session: SessionListByAuthenticationRepository
  ) {}

  async getByAccountId (accountId: string): Promise<Session> {
    const authentication = await this.authentication.getByAccountId(accountId)
    if (!authentication) throw new Error('account not found')
    await this.session.getSessionsByAuthenticationId(authentication.id)
    return null
  }
}
