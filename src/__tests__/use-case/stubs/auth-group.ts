import { AuthGroupProperties, AuthGroup } from '@/entity/auth-group'
import { uuid } from '@/entity/utils'
import { CreateAuthGroupRepository } from '@/use-case/auth-group/protocols/create-auth-group-repository'
import { GetAuthGroupRepository, ListAuthGroupRepository } from '@/use-case/auth-group/protocols/get-auth-group-repository'
import { UpdateAuthGroupRepository } from '@/use-case/auth-group/protocols/update-auth-group-repository'
import { mockAuthGroup, mockAuthGroupProperties } from '@/__tests__/entity/mock/auth-group'

export const mockedAuthGroup = mockAuthGroup()
export const mockedAuthGroupList = [
  mockAuthGroup(),
  mockAuthGroup(),
  mockAuthGroup(),
  mockAuthGroup(),
  mockAuthGroup()
]
export const mockedAuthGroupProperties = mockAuthGroupProperties()

export function makeCreateAuthGroupRepositoryStub (): CreateAuthGroupRepository {
  class CreateAuthGroupRepositoryStub implements CreateAuthGroupRepository {
    async create (authGroup: AuthGroupProperties): Promise<AuthGroup> {
      return mockedAuthGroup
    }
  }
  return new CreateAuthGroupRepositoryStub()
}

export function makeListAuthGroupStub (): ListAuthGroupRepository {
  class ListAuthGroupRepositoryStub implements ListAuthGroupRepository {
    async list (): Promise<AuthGroup[]> {
      return mockedAuthGroupList
    }
  }
  return new ListAuthGroupRepositoryStub()
}

export function makeGetAuthGroupStub (): GetAuthGroupRepository {
  class GetAuthGroupRepositoryStub implements GetAuthGroupRepository {
    async get (authGroupId: uuid): Promise<AuthGroup> {
      return mockedAuthGroup
    }
  }
  return new GetAuthGroupRepositoryStub()
}

export function makeUpdateAuthGroupStub (): UpdateAuthGroupRepository {
  class UpdateAuthGroupRepositoryStub implements UpdateAuthGroupRepository {
    async update (authGroupId: uuid, authGroup: Partial<AuthGroup>): Promise<AuthGroup> {
      return mockedAuthGroup
    }
  }
  return new UpdateAuthGroupRepositoryStub()
}
