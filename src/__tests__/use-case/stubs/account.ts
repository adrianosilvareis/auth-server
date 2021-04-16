import { uuid } from '@/entity/utils'
import { AccountModel } from '@/entity/account'
import { AccountsByGroupRepository } from '@/use-case/account/protocols/account-by-auth-group-repository'
import { mockAccount } from '@/__tests__/entity/mock/account'

export const mockedAccount = mockAccount()
export function makeAccountByGroupRepositoryStub (): AccountsByGroupRepository {
  class AccountByGroupRepositoryStub implements AccountsByGroupRepository {
    async getAccountByGroup (authGroupId: uuid):Promise<AccountModel[]> {
      return []
    }
  }
  return new AccountByGroupRepositoryStub()
}
