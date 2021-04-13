export interface SessionDropRepository {
  drop(sessionId: string): Promise<void>
}
