import { Session } from '@/entity/session'

export type SessionFilters = Partial<Session>
export interface SessionListRepository {
  getSessionList(options?: SessionFilters): Promise<Session[]>
}

export interface SessionListByAuthenticationRepository {
  getSessionsByAuthenticationId(authenticationId: string):Promise<Session[]>
}
