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

export interface SessionByAccount {
  getByAccountId(accountId: string): Promise<Session[]>
}

export interface SessionById {
  getById(sessionId: string): Promise<Session>
}

export interface CreateSession {
  create(property: SessionProperties): Promise<Session>
}

export interface SessionDrop {
  drop(sessionId: string, accountId: string): Promise<void>
}

export interface SessionLimitCheckByAccount {
  check(accountId: string): Promise<boolean>
}

export interface SessionCheckValidation {
  check(sessionId: string, userAgent: string): Promise<boolean>
}
