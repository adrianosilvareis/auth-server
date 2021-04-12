import { Authentication, AuthenticationByAccount, StatusType } from '@/entity/authentication'
import { Session } from '@/entity/session'
import faker from 'faker'
import { AuthenticationByAccountRepository } from '../protocols/authentication-repository'
import { SessionListByAuthenticationRepository } from '../protocols/session-repository'
import { DbSessionByAccount } from './db-session-by-authentication'

const mockedAuthentication = mockAuthentication()
describe('SessionByAccount', () => {
  it('should call get authentication with account_id', async () => {
    const functionName = 'getByAccountId'
    const expectedCalled = 'any_account_id'
    const { sut, authenticationByAccountStub } = makeSut()
    const spy = jest.spyOn(authenticationByAccountStub, functionName)
    await sut.getByAccountId(expectedCalled)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if getAuthenticationByAccount throws', async () => {
    const functionName = 'getByAccountId'
    const expectedThrow = new Error('any_get_authentication_by_account')
    const data = 'any_account_id'
    const { sut, authenticationByAccountStub } = makeSut()
    jest.spyOn(authenticationByAccountStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.getByAccountId(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should throw account not found if getAuthenticationByAccount return null or empty', async () => {
    const functionName = 'getByAccountId'
    const expectedThrow = new Error('account not found')
    const data = 'any_account_id'
    const { sut, authenticationByAccountStub } = makeSut()
    jest.spyOn(authenticationByAccountStub, functionName).mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.getByAccountId(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should call get sessions active with authentication_id', async () => {
    const functionName = 'getSessionsByAuthenticationId'
    const data = 'any_account_id'
    const expectedCalled = mockedAuthentication.id
    const { sut, sessionListByAuthenticationStub } = makeSut()
    const spy = jest.spyOn(sessionListByAuthenticationStub, functionName)
    await sut.getByAccountId(data)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if getSessionsByAuthenticationId throws', async () => {
    const functionName = 'getSessionsByAuthenticationId'
    const expectedThrow = new Error('any_get_authentication_by_account')
    const data = 'any_account_id'
    const { sut, sessionListByAuthenticationStub } = makeSut()
    jest.spyOn(sessionListByAuthenticationStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.getByAccountId(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it.todo('should return all sessions that belong to him')
})

type SutTypes = {
  sut: DbSessionByAccount,
  authenticationByAccountStub: AuthenticationByAccountRepository,
  sessionListByAuthenticationStub: SessionListByAuthenticationRepository
}

function makeSut (): SutTypes {
  const authenticationByAccountStub = makeAuthenticationByAccountStub()
  const sessionListByAuthenticationStub = makeSessionListByAccountRepositoryStub()
  const sut = new DbSessionByAccount(authenticationByAccountStub, sessionListByAuthenticationStub)

  return {
    sut,
    authenticationByAccountStub,
    sessionListByAuthenticationStub
  }
}
function makeSessionListByAccountRepositoryStub ():SessionListByAuthenticationRepository {
  class SessionByAccountRepositoryStub implements SessionListByAuthenticationRepository {
    getSessionsByAuthenticationId (accountId: string): Promise<Session[]> {
      return null
    }
  }
  return new SessionByAccountRepositoryStub()
}

function makeAuthenticationByAccountStub (): AuthenticationByAccount {
  class AuthenticationByAccountStub implements AuthenticationByAccountRepository {
    async getByAccountId (accountId: string): Promise<Authentication> {
      return mockedAuthentication
    }
  }
  return new AuthenticationByAccountStub()
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
