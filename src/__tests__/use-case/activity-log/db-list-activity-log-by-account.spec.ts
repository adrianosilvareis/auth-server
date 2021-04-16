import { ActivityLog } from '@/entity/activity-log'
import { DbListActivityLogByAccount } from '@/use-case/activity-log/db-list-activity-log-by-account'
import { ListActivityLogByAccountRepository } from '@/use-case/activity-log/protocols/list-activity-log-by-account-repository'

describe('DbListActivityLogByAccount', () => {
  it('should call listActivityLogByAccountRepository with correct values', async () => {
    const { sut, listActivityLogByAccountStub } = makeSut()
    const functionName = 'listByAccountId'
    const accountId = 'a1-a1-a1-a1'
    const spy = jest.spyOn(listActivityLogByAccountStub, functionName)
    await sut.listByAccountId(accountId)
    expect(spy).toHaveBeenCalledWith(accountId)
  })
  it.todo('should throw if listActivityLogByAccountRepository throw')
  it.todo('should return a list of activity logs for account')
})

type SutTypes = {
  sut: DbListActivityLogByAccount,
  listActivityLogByAccountStub: ListActivityLogByAccountRepository
}

function makeSut (): SutTypes {
  const listActivityLogByAccountStub = makeListActivityLogByAccountRepositoryStub()
  const sut = new DbListActivityLogByAccount(listActivityLogByAccountStub)

  return {
    sut,
    listActivityLogByAccountStub
  }
}

function makeListActivityLogByAccountRepositoryStub (): ListActivityLogByAccountRepository {
  class ListActivityLogByAccountRepositoryStub implements ListActivityLogByAccountRepository {
    async listByAccountId (accountId: `${string}-${string}-${string}-${string}`): Promise<ActivityLog[]> {
      return null
    }
  }
  return new ListActivityLogByAccountRepositoryStub()
}
