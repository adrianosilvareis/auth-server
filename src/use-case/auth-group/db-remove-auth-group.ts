import { AuthGroup, RemoveAuthGroup } from '@/entity/auth-group'
import { uuid } from '@/entity/utils'
import { AccountsByGroupRepository } from '../account/protocols/account-by-auth-group-repository'
import { RemoveAuthGroupRepository } from './protocols/remove-auth-group-repository'

export class DbRemoveAuthGroup implements RemoveAuthGroup {
  constructor (
    private readonly account: AccountsByGroupRepository,
    private readonly authGroupRepo: RemoveAuthGroupRepository
  ) {}

  async remove (authGroupId: uuid): Promise<AuthGroup> {
    const accounts = await this.account.getAccountByGroup(authGroupId)
    if (accounts.length) {
      throw new Error('auth group in use')
    }
    await this.authGroupRepo.remove(authGroupId)
    return null
  }
}
