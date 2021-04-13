import { AuthenticationByAccountRepository } from '@/use-case/session/protocols/authentication-repository'
import { SessionCountByAuthenticationRepository } from '@/use-case/session/protocols/session-count-by-authentication-repository'
import { DbSessionLimitCheckByAccount } from '@/use-case/session/session-limit/db-session-limit-check'
import { makeAuthenticationByAccountStub } from '../stubs/authentications'
import { makeSessionCountByAuthenticationRepository } from '../stubs/sessions'

describe('DbSessionLimitCheckByAccount', () => {
  it('should call get authentication with account_id', async () => {
    const functionName = 'getByAccountId'
    const expectedCalled = 'any_account_id'
    const { sut, authenticationByAccountStub } = makeSut()
    const spy = jest.spyOn(authenticationByAccountStub, functionName)
    await sut.check(expectedCalled)
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if getAuthenticationByAccount throws', async () => {
    const data = 'any_account_id'
    const functionName = 'getByAccountId'
    const expectedThrow = new Error('any_get_authentication_by_account')
    const { sut, authenticationByAccountStub } = makeSut()
    jest.spyOn(authenticationByAccountStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.check(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should throw account not found if getAuthenticationByAccount return null or empty', async () => {
    const data = 'any_account_id'
    const functionName = 'getByAccountId'
    const expectedThrow = new Error('account not found')
    const { sut, authenticationByAccountStub } = makeSut()
    jest.spyOn(authenticationByAccountStub, functionName).mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.check(data)
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it.todo('should call session count with authentication_id')
  it.todo('should throw if session count throws')
  it.todo('should throw if session count greater than limit of account')
})

type SutTypes = {
  sut: DbSessionLimitCheckByAccount,
  authenticationByAccountStub: AuthenticationByAccountRepository,
  sessionCountByAuthenticationStub: SessionCountByAuthenticationRepository
}

function makeSut (): SutTypes {
  const authenticationByAccountStub = makeAuthenticationByAccountStub()
  const sessionCountByAuthenticationStub = makeSessionCountByAuthenticationRepository()
  const sut = new DbSessionLimitCheckByAccount(authenticationByAccountStub, sessionCountByAuthenticationStub)
  return {
    sut,
    authenticationByAccountStub,
    sessionCountByAuthenticationStub
  }
}
