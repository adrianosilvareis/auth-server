import { AuthGroup } from '@/entity/auth-group'
import { DbListAuthGroup } from '@/use-case/auth-group/db-list-auth-group'
import { ListAuthGroupRepository } from '@/use-case/auth-group/protocols/list-auth-group-repository'

describe('DbListAuthGroup', () => {
  it('should call ListAuthGroupRepository', async () => {
    const { sut, listAuthGroupStub } = makeSut()
    const functionName = 'list'
    const spy = jest.spyOn(listAuthGroupStub, functionName)
    await sut.list()
    expect(spy).toHaveBeenCalled()
  })
  it.todo('should throw if ListAuthGroupRepository throw')
  it.todo('should return a list of authGroup')
})

type SutTypes = {
  sut: DbListAuthGroup,
  listAuthGroupStub: ListAuthGroupRepository,
}

function makeSut (): SutTypes {
  const listAuthGroupStub = makeListAuthGroupStub()
  const sut = new DbListAuthGroup(listAuthGroupStub)

  return {
    sut,
    listAuthGroupStub
  }
}

function makeListAuthGroupStub (): ListAuthGroupRepository {
  class ListAuthGroupRepositoryStub implements ListAuthGroupRepository {
    async list (): Promise<AuthGroup[]> {
      return []
    }
  }
  return new ListAuthGroupRepositoryStub()
}
