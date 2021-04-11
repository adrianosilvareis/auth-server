import { Session } from '@/entity/session'

export type SessionFilters = Partial<Session>
export interface SessionRepository {
  getSessionList(options?: SessionFilters): Promise<Session[]>
}
