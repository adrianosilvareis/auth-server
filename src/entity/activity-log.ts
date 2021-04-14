import { ip, uuid } from './utils'

export interface CreateActivityLog {
  sessionId: uuid
  activity: string
  createdAt: Date
  username: string,
  ip: ip
}
