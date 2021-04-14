import { ip, uuid } from './utils'

export interface ActivityLog {
  id: uuid,
  sessionId: uuid
  activity: string
  createdAt: Date
  username: string,
  ip: ip
}

export type ActivityLogProperties = Omit<ActivityLog, 'id'>
export interface CreateActivityLog {
  logActivity(activity: ActivityLogProperties): Promise<ActivityLog>
}
