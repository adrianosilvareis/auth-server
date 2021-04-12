import { Authentication, AuthenticationByAccount } from '@/entity/authentication'
import { AuthenticationByAccountRepository } from '@/use-case/session/protocols/authentication-repository'
import { mockAuthentication } from '@/__tests__/entity/mock/authentications'

export const mockedAuthentication = mockAuthentication()
export function makeAuthenticationByAccountStub (): AuthenticationByAccount {
  class AuthenticationByAccountStub implements AuthenticationByAccountRepository {
    async getByAccountId (accountId: string): Promise<Authentication> {
      return mockedAuthentication
    }
  }
  return new AuthenticationByAccountStub()
}
