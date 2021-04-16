import { uuid } from '@/entity/utils'
import { Account } from '@/entity/account'
import { AccountsByGroupRepository } from '@/use-case/account/protocols/account-by-auth-group-repository'
import { DbRemoveAuthGroup } from '@/use-case/auth-group/db-remove-auth-group'
import { mockAccount } from '@/__tests__/entity/mock/account'
import { RemoveAuthGroupRepository } from '@/use-case/auth-group/protocols/remove-auth-group-repository'

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
  it('should throw if accountByGroupRepository return any account', async () => {
    const { sut, accountByGroupRepositoryStub } = makeSut()
    const functionName = 'getAccountByGroup'
    const authGroupId = 'a1-a1-a1-a1'
    const expectedThrow = new Error('auth group in use')
    jest.spyOn(accountByGroupRepositoryStub, functionName).mockReturnValueOnce(Promise.resolve([mockedAccount]))
    const promise = sut.remove(authGroupId)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should call removeAuthGroupRepository', async () => {
    const { sut, removeAuthGroupRepositoryStub } = makeSut()
    const functionName = 'remove'
    const authGroupId = 'a1-a1-a1-a1'
    const spy = jest.spyOn(removeAuthGroupRepositoryStub, functionName)
    await sut.remove(authGroupId)
    expect(spy).toHaveBeenCalledWith(authGroupId)
  })
  it.todo('should throw if removeAuthGroupRepository throw')
  it.todo('should return AuthGroup deleted on success')
})

type SutTypes = {
  sut: DbRemoveAuthGroup,
  accountByGroupRepositoryStub: AccountsByGroupRepository,
  removeAuthGroupRepositoryStub: RemoveAuthGroupRepository
}

function makeSut (): SutTypes {
  const accountByGroupRepositoryStub = makeAccountByGroupRepositoryStub()
  const removeAuthGroupRepositoryStub = makeRemoveAuthGroupRepositoryStub()
  const sut = new DbRemoveAuthGroup(accountByGroupRepositoryStub, removeAuthGroupRepositoryStub)

  return {
    sut,
    accountByGroupRepositoryStub,
    removeAuthGroupRepositoryStub
  }
}

const mockedAccount = mockAccount()
function makeAccountByGroupRepositoryStub (): AccountsByGroupRepository {
  class AccountByGroupRepositoryStub implements AccountsByGroupRepository {
    async getAccountByGroup (authGroupId: uuid):Promise<Account[]> {
      return []
    }
  }
  return new AccountByGroupRepositoryStub()
}

function makeRemoveAuthGroupRepositoryStub (): RemoveAuthGroupRepository {
  class RemoveAuthGroupRepositoryStub implements RemoveAuthGroupRepository {
    async remove (authGroupId: uuid): Promise<AuthGroup> {
      return null
    }
  }
  return new RemoveAuthGroupRepositoryStub()
}
