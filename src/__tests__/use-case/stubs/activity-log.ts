import { ActivityLogProperties, ActivityLog } from '@/entity/activity-log'
import { CreateActivityLogRepository } from '@/use-case/activity-log/protocols/create-activity-log-repository'
import { mockedActivityLog } from '@/__tests__/entity/mock/activity-log'

export function makeCreateActivityLogRepositoryStub (): CreateActivityLogRepository {
  class CreateActivityLogRepositoryStub implements CreateActivityLogRepository {
    async create (activity: ActivityLogProperties): Promise<ActivityLog> {
      return mockedActivityLog
    }
  }
  return new CreateActivityLogRepositoryStub()
}
