export enum AuthenticationStatusEnum {
  Online,
  Offline,
  Blocked,
  Created,
}

export interface Authentication {
  id: string
  accountId: string
  password: string
  attempts: number
  sessionLimit: number
  status: AuthenticationStatusEnum
  active: true
  authGroup: string[]
  createdAt: Date
  updatedAt: Date
}

export type AuthenticationProperties = Omit<Authentication, 'id'>

export interface AuthenticationList {
  getList(): Promise<Authentication[]>
}

export interface AuthenticationByAccount {
  getByAccountId (accountId: string): Promise<Authentication>
}

export interface UpdateAuthentication {
  updateById(id: string, auth: AuthenticationProperties): Promise<Authentication>
}

export interface CreateAuthentication {
  create(auth: AuthenticationProperties): Promise<Authentication>
}

export interface CancelAuthentication {
  cancel(authenticationId: string): Promise<void>
}
