import { AuthGroupProperties, AuthGroup } from '@/entity/auth-group'
import { CreateAuthGroupRepository } from '@/use-case/auth-group/protocols/create-auth-group-repository'
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
