export interface Session {
  id: string
  authenticationId: string
  ip: string
  userAgent: string
  createdAt: Date
  dueDate: Date
  active: boolean
}

export type SessionProperties = Omit<Session, 'id'>

export interface SessionList {
  listActiveSessions(): Promise<Session[]>
}

export interface GetSessionByUser {
  getByUserId(userId: string): Promise<Session>
}

export interface CreateSession {
  create(property: SessionProperties): Promise<Session>
}

export interface DropSession {
  drop(sessionId: string): Promise<void>
}
