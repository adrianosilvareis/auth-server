import { AuthenticationByAccount, AuthenticationStatusEnum } from '@/entity/authentication'
import { AuthenticationUpdateStatusRepository } from '@/use-case/session/protocols/authentication-update-status-repository'
import { SessionCountByAuthenticationRepository } from '@/use-case/session/protocols/session-count-by-authentication-repository'
import { SessionDropRepository } from '@/use-case/session/protocols/session-drop'
import { DbSessionDrop } from '@/use-case/session/db-session-drop'
import { makeAuthenticationByAccountStub, makeAuthenticationUpdateStatusRepositoryStub, mockedAuthentication } from '../stubs/authentications'
import { makeSessionCountByAuthenticationRepository, makeSessionDropRepositoryStub } from '../stubs/sessions'

describe('DbSessionDrop', () => {
  it('should call get authentication with account_id', async () => {
    const functionName = 'getByAccountId'
    const expectedCalled = 'any_account_id'
    const { sut, authenticationByAccountStub } = makeSut()
    const spy = jest.spyOn(authenticationByAccountStub, functionName)
    await sut.drop('any_session_id', 'any_account_id')
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if getAuthenticationByAccount throws', async () => {
    const functionName = 'getByAccountId'
    const expectedThrow = new Error('any_get_authentication_by_account')
    const { sut, authenticationByAccountStub } = makeSut()
    jest.spyOn(authenticationByAccountStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.drop('any_session_id', 'any_account_id')
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should throw account not found if getAuthenticationByAccount return null or empty', async () => {
    const functionName = 'getByAccountId'
    const expectedThrow = new Error('account not found')
    const { sut, authenticationByAccountStub } = makeSut()
    jest.spyOn(authenticationByAccountStub, functionName).mockReturnValueOnce(Promise.resolve(null))
    const promise = sut.drop('any_session_id', 'any_account_id')
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should call session drop with correct values', async () => {
    const functionName = 'drop'
    const expectedCalled = 'any_session_id'
    const { sut, sessionDropStub } = makeSut()
    const spy = jest.spyOn(sessionDropStub, functionName)
    await sut.drop('any_session_id', 'any_account_id')
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should throw if session drop throws', async () => {
    const functionName = 'drop'
    const expectedThrow = new Error('any_session_drop_error')
    const { sut, sessionDropStub } = makeSut()
    jest.spyOn(sessionDropStub, functionName).mockReturnValueOnce(Promise.reject(expectedThrow))
    const promise = sut.drop('any_session_id', 'any_account_id')
    await expect(promise).rejects.toThrowError(expectedThrow)
  })
  it('should call SessionCount with authentication_id ', async () => {
    const functionName = 'count'
    const expectedCalled = mockedAuthentication.id
    const { sut, sessionCountByAuthenticationStub } = makeSut()
    const spy = jest.spyOn(sessionCountByAuthenticationStub, functionName)
    await sut.drop('any_session_id', 'any_account_id')
    expect(spy).toHaveBeenCalledWith(expectedCalled)
  })
  it('should update authentication status to offline if not has other session opened', async () => {
    const functionName = 'count'
    const functionSpyName = 'updateStatus'
    const returnCountSession = 1
    const { sut, sessionCountByAuthenticationStub, authenticationUpdateStatus } = makeSut()
    jest.spyOn(sessionCountByAuthenticationStub, functionName).mockReturnValueOnce(Promise.resolve(returnCountSession))
    const spy = jest.spyOn(authenticationUpdateStatus, functionSpyName)
    await sut.drop('any_session_id', 'any_account_id')
    expect(spy).toHaveBeenCalledWith(mockedAuthentication.id, AuthenticationStatusEnum.Offline)
  })
  it('should return void on success', async () => {
    const { sut } = makeSut()
    const response = await sut.drop('any_session_id', 'any_account_id')
    expect(response).toBeFalsy()
  })
})

type SutTypes = {
  sut: DbSessionDrop,
  authenticationByAccountStub: AuthenticationByAccount,
  sessionCountByAuthenticationStub: SessionCountByAuthenticationRepository,
  authenticationUpdateStatus: AuthenticationUpdateStatusRepository,
  sessionDropStub: SessionDropRepository
}

function makeSut (): SutTypes {
  const authenticationByAccountStub = makeAuthenticationByAccountStub()
  const sessionDropStub = makeSessionDropRepositoryStub()
  const sessionCountByAuthenticationStub = makeSessionCountByAuthenticationRepository()
  const authenticationUpdateStatus = makeAuthenticationUpdateStatusRepositoryStub()
  const sut = new DbSessionDrop(authenticationByAccountStub, sessionCountByAuthenticationStub, authenticationUpdateStatus, sessionDropStub)

  return {
    sut,
    authenticationByAccountStub,
    sessionCountByAuthenticationStub,
    authenticationUpdateStatus,
    sessionDropStub
  }
}
