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
  it('should throw if getAuthenticationByUser throws', async () => {
    const functionName = 'getByUserId'
    const expectedThrow = new Error('any_get_authentication_by_user')
    const data = 'any_user_id'
    const { sut, authenticationByUserStub } = makeSut()
    jest.spyOn(authenticationByUserStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.getByUserId(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should throw user not found if getAuthenticationByUser return null or empty', async () => {
    const functionName = 'getByUserId'
    const expectedThrow = new Error('user not found')
    const data = 'any_user_id'
    const { sut, authenticationByUserStub } = makeSut()
    jest.spyOn(authenticationByUserStub, functionName).mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.getByUserId(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should call get sessions active with authentication_id', async () => {
    const functionName = 'getByUserId'
    const expectedCalled = 'any_user_id'
    const { sut, authenticationByUserStub } = makeSut()
    const spy = jest.spyOn(authenticationByUserStub, functionName)
    await sut.getByUserId(expectedCalled)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
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
