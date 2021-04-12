import { AuthenticationByAccountRepository } from '@/use-case/session/protocols/authentication-repository'
import { SessionListByAuthenticationRepository } from '@/use-case/session/protocols/session-repository'
import { DbSessionByAccount } from '@/use-case/session/session-by-account/db-session-by-account'
import { makeAuthenticationByAccountStub, mockedAuthentication } from '../stubs/authentications'
import { makeSessionListByAccountRepositoryStub, mockedReturnGetSessionListRepository } from '../stubs/sessions'

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
  it('should return all sessions that belong to him', async () => {
    const data = 'any_account_id'
    const expectedReturn = mockedReturnGetSessionListRepository
    const { sut } = makeSut()
    const response = await sut.getByAccountId(data)
    expect(response).toEqual(expectedReturn)
  })
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
