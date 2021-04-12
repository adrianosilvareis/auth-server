import { Authentication } from '@/entity/authentication'

export interface AuthenticationByAccountRepository {
  getByAccountId(accountId: string): Promise<Authentication>
}
