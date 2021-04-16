import { AuthGroup, RemoveAuthGroup } from '@/entity/auth-group'
import { uuid } from '@/entity/utils'
import { AccountsByGroupRepository } from '../account/protocols/account-by-auth-group-repository'

export class DbRemoveAuthGroup implements RemoveAuthGroup {
  constructor (private readonly account: AccountsByGroupRepository) {}

  async remove (authGroupId: uuid): Promise<AuthGroup> {
    await this.account.getAccountByGroup(authGroupId)
    return null
  }
}
