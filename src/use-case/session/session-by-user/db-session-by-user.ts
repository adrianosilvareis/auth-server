import { AuthenticationByUser } from '@/entity/authentication'
import { Session, SessionByUser } from '@/entity/session'

export class DbSessionByUser implements SessionByUser {
  constructor (private readonly authentication: AuthenticationByUser) {}

  async getByUserId (userId: string): Promise<Session> {
    const authentication = await this.authentication.getByUserId(userId)
    if (!authentication) throw new Error('user not found')
    return null
  }
}
