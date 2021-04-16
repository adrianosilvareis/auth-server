import { AccountModel } from '@/entity/account'
import { uuid } from '@/entity/utils'
import { DbListAccountByAuthGroup } from '@/use-case/account/db-list-account-by-auth-group'
import { AccountsByGroupRepository } from '@/use-case/account/protocols/account-by-auth-group-repository'

describe('DbListAccountByAuthGroup', () => {
  it('should call AccountsByGroupRepository with correct values', async () => {
    const { sut, listAccountsByGroup } = makeSut()
    const functionName = 'getAccountByGroup'
    const authGroupId = 'a1-a1-a1-a1'
    const spy = jest.spyOn(listAccountsByGroup, functionName)
    await sut.listAccountByAuthGroupId(authGroupId)
    expect(spy).toHaveBeenCalledWith(authGroupId)
  })
  it.todo('should throw if AccountsByGroupRepository throws')
  it.todo('should return accounts on success')
})

type SutTypes = {
  sut: DbListAccountByAuthGroup,
  listAccountsByGroup: AccountsByGroupRepository
}

function makeSut (): SutTypes {
  const listAccountsByGroup = makeAccountsByGroupRepositoryStub()
  const sut = new DbListAccountByAuthGroup(listAccountsByGroup)

  return {
    sut,
    listAccountsByGroup
  }
}

function makeAccountsByGroupRepositoryStub (): AccountsByGroupRepository {
  class AccountsByGroupRepositoryStub implements AccountsByGroupRepository {
    async getAccountByGroup (authGroupId: uuid): Promise<AccountModel[]> {
      return null
    }
  }
  return new AccountsByGroupRepositoryStub()
}
