import { ActivityLogProperties, ActivityLog } from '@/entity/activity-log'
import { uuid } from '@/entity/utils'
import { CreateActivityLogRepository } from '@/use-case/activity-log/protocols/create-activity-log-repository'
import { ListActivityLogByAccountRepository } from '@/use-case/activity-log/protocols/list-activity-log-by-account-repository'
import { mockedActivityLog, mockedActivityLogList } from '@/__tests__/entity/mock/activity-log'

export function makeCreateActivityLogRepositoryStub (): CreateActivityLogRepository {
  class CreateActivityLogRepositoryStub implements CreateActivityLogRepository {
    async create (activity: ActivityLogProperties): Promise<ActivityLog> {
      return mockedActivityLog
    }
  }
  return new CreateActivityLogRepositoryStub()
}

export function makeListActivityLogByAccountRepositoryStub (): ListActivityLogByAccountRepository {
  class ListActivityLogByAccountRepositoryStub implements ListActivityLogByAccountRepository {
    async listByAccountId (accountId: uuid): Promise<ActivityLog[]> {
      return mockedActivityLogList
    }
  }
  return new ListActivityLogByAccountRepositoryStub()
}
