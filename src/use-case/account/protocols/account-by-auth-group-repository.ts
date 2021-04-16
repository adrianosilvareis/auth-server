import { uuid } from '@/entity/utils'

export interface AccountsByGroupRepository {
  getAccountByGroup(authGroupId: uuid): Promise<Account[]>
}
