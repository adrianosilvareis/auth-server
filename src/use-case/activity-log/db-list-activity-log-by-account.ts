import { ActivityLog, ListActivityLogByAccount } from '@/entity/activity-log'
import { uuid } from '@/entity/utils'
import { ListActivityLogByAccountRepository } from './protocols/list-activity-log-by-account-repository'

export class DbListActivityLogByAccount implements ListActivityLogByAccount {
  constructor (private readonly activityLogRepo: ListActivityLogByAccountRepository) {}

  async listByAccountId (accountId: uuid): Promise<ActivityLog[]> {
    await this.activityLogRepo.listByAccountId(accountId)
    return null
  }
}
