import { uuid } from '@/entity/utils'
import { Account } from '@/entity/account'

export interface AccountsByGroupRepository {
  getAccountByGroup(authGroupId: uuid): Promise<Account[]>
}
