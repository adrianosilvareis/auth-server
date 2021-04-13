import { SessionLimitCheckByAccount } from '@/entity/session'
import { AuthenticationByAccountRepository } from '../protocols/authentication-repository'
import { SessionCountByAuthenticationRepository } from '../protocols/session-count-by-authentication-repository'

export class DbSessionLimitCheckByAccount implements SessionLimitCheckByAccount {
  constructor (
    private readonly authentication: AuthenticationByAccountRepository,
    private readonly sessionCount: SessionCountByAuthenticationRepository
  ) {}

  async check (accountId: string): Promise<boolean> {
    const authentication = await this.authentication.getByAccountId(accountId)
    if (!authentication) throw new Error('account not found')
    const activeSessionCount = await this.sessionCount.count(authentication.id)
    if (activeSessionCount > authentication.sessionLimit) {
      return true
    }
    return false
  }
}
