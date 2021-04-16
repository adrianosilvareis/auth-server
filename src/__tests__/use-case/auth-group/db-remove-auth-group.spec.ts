import { uuid } from '@/entity/utils'
import { AccountsByGroupRepository } from '@/use-case/account/protocols/account-by-auth-group-repository'
import { DbRemoveAuthGroup } from '@/use-case/auth-group/db-remove-auth-group'

describe('DbRemoveAuthGroup', () => {
  it('should call accountByGroupRepository with authGroupId', async () => {
    const { sut, accountByGroupRepositoryStub } = makeSut()
    const functionName = 'getAccountByGroup'
    const authGroupId = 'a1-a1-a1-a1'
    const spy = jest.spyOn(accountByGroupRepositoryStub, functionName)
    await sut.remove(authGroupId)
    expect(spy).toHaveBeenCalledWith(authGroupId)
  })
  it('should throw if accountByGroupRepository throws', async () => {
    const { sut, accountByGroupRepositoryStub } = makeSut()
    const functionName = 'getAccountByGroup'
    const authGroupId = 'a1-a1-a1-a1'
    const expectedThrow = new Error('any_accounts_by_auth_group_error')
    jest.spyOn(accountByGroupRepositoryStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.remove(authGroupId)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it.todo('should throw if accountByGroupRepository return any account')
  it.todo('should call removeAuthGroupRepository')
  it.todo('should throw if removeAuthGroupRepository throw')
  it.todo('should return AuthGroup deleted on success')
})

type SutTypes = {
  sut: DbRemoveAuthGroup,
  accountByGroupRepositoryStub: AccountsByGroupRepository
}

function makeSut (): SutTypes {
  const accountByGroupRepositoryStub = makeAccountByGroupRepositoryStub()
  const sut = new DbRemoveAuthGroup(accountByGroupRepositoryStub)

  return {
    sut,
    accountByGroupRepositoryStub
  }
}

function makeAccountByGroupRepositoryStub (): AccountsByGroupRepository {
  class AccountByGroupRepositoryStub implements AccountsByGroupRepository {
    async getAccountByGroup (authGroupId: uuid):Promise<Account[]> {
      return null
    }
  }
  return new AccountByGroupRepositoryStub()
}
