import { Authentication, AuthenticationByUser, StatusType } from '@/entity/authentication'
import faker from 'faker'
import { DbSessionByUser } from './db-session-by-user'

const mockedAuthentication = mockAuthentication()
describe('SessionByUser', () => {
  it('should call get authentication with user_id', async () => {
    const functionName = 'getByUserId'
    const expectedCalled = 'any_user_id'
    const { sut, authenticationByUserStub } = makeSut()
    const spy = jest.spyOn(authenticationByUserStub, functionName)
    await sut.getByUserId(expectedCalled)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it.todo('should throw if getAuthenticationByUser throws')
  it.todo('should call get sessions active with authentication_id')
  it.todo('should throw if getSessionByAuthentication throws')
  it.todo('should return all sessions that belong to him')
})

type SutTypes = {
  sut: DbSessionByUser,
  authenticationByUserStub: AuthenticationByUser
}
function makeSut (): SutTypes {
  const authenticationByUserStub = makeAuthenticationByUserStub()
  const sut = new DbSessionByUser(authenticationByUserStub)

  return {
    sut,
    authenticationByUserStub
  }
}

function makeAuthenticationByUserStub (): AuthenticationByUser {
  class AuthenticationByUserStub implements AuthenticationByUser {
    async getByUserId (userId: string): Promise<Authentication> {
      return mockedAuthentication
    }
  }
  return new AuthenticationByUserStub()
}

function mockAuthentication (): Authentication {
  const authGroup = []
  for (let index = 0; index < 3; index++) {
    authGroup.push(faker.datatype.uuid())
  }
  return {
    id: faker.datatype.uuid(),
    accountId: faker.datatype.uuid(),
    password: faker.internet.password(8),
    attempts: faker.datatype.number(2),
    sessionLimit: faker.datatype.number(3),
    status: StatusType.Offline,
    active: true,
    authGroup,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
}
