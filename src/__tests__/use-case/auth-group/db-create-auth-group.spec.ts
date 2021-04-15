import { AuthGroupProperties, AuthGroup } from '@/entity/auth-group'
import { uuid } from '@/entity/utils'
import { DbCreateAuthGroup } from '@/use-case/auth-group/db-create-auth-group'
import { CreateAuthGroupRepository } from '@/use-case/auth-group/protocols/create-auth-group-repository'
import faker from 'faker'

describe('DbCreateAuthGroup', () => {
  it('should call CreateAuthGroupRepository with correct values', async () => {
    const { sut, createAuthGroupStub } = makeSut()
    const functionName = 'create'
    const spy = jest.spyOn(createAuthGroupStub, functionName)
    await sut.create(mockedAuthGroupProperties)
    expect(spy).toHaveBeenCalledWith(mockedAuthGroupProperties)
  })
  it('should throw if CreateAuthGroupRepository throws', async () => {
    const { sut, createAuthGroupStub } = makeSut()
    const functionName = 'create'
    const expectedThrow = new Error('any_create_auth_error')
    jest.spyOn(createAuthGroupStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.create(mockedAuthGroupProperties)
    expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should return a AuthGroupModel on success', async () => {
    const { sut } = makeSut()
    const response = await sut.create(mockedAuthGroupProperties)
    expect(response).toEqual(mockedAuthGroup)
  })
})

type SutTypes = {
  sut: DbCreateAuthGroup,
  createAuthGroupStub: CreateAuthGroupRepository
}

function makeSut (): SutTypes {
  const createAuthGroupStub = makeCreateAuthGroupRepositoryStub()
  const sut = new DbCreateAuthGroup(createAuthGroupStub)

  return {
    sut,
    createAuthGroupStub
  }
}

function makeCreateAuthGroupRepositoryStub (): CreateAuthGroupRepository {
  class CreateAuthGroupRepositoryStub implements CreateAuthGroupRepository {
    async create (authGroup: AuthGroupProperties): Promise<AuthGroup> {
      return mockedAuthGroup
    }
  }
  return new CreateAuthGroupRepositoryStub()
}

const mockedAuthGroup = mockAuthGroup()
function mockAuthGroup (): AuthGroup {
  const activity = {
    name: faker.name.title(),
    permissions: [
      faker.lorem.word(5),
      faker.lorem.word(5),
      faker.lorem.word(5)
    ]
  }
  return {
    id: <uuid>faker.datatype.uuid(),
    title: faker.name.title(),
    activities: [activity]
  }
}

const mockedAuthGroupProperties = mockAuthGroupProperties()
function mockAuthGroupProperties (): AuthGroupProperties {
  const data = Object.assign({}, mockedAuthGroup)
  Reflect.deleteProperty(data, 'id')
  return data
}
