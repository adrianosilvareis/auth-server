import { ActivityLog, ActivityLogProperties } from '@/entity/activity-log'
import { uuid, ip } from '@/entity/utils'
import faker from 'faker'

export const mockedActivityLog = mockActivityLog()
export function mockActivityLog (): ActivityLog {
  return {
    id: <uuid>faker.datatype.uuid(),
    activity: faker.lorem.word(10),
    createdAt: faker.date.recent(),
    username: faker.internet.userName(),
    ip: <ip>faker.internet.ip(),
    sessionId: <uuid>faker.datatype.uuid()
  }
}
export const mockedActivityLogProperties = mockActivityLogProperties()
export function mockActivityLogProperties (): ActivityLogProperties {
  const activity = Object.assign({}, mockedActivityLog)
  Reflect.deleteProperty(activity, 'id')
  return activity
}
