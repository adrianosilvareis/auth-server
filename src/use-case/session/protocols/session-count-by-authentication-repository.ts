export interface SessionCountByAuthenticationRepository {
  count(authenticationId: string): Promise<number>
}
