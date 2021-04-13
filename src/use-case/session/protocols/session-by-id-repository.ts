import { Session } from '@/entity/session'

export interface SessionByIdRepository {
  getById(sessionId: string): Promise<Session>
}
