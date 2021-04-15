import { uuid } from './utils'

// not save in database
export interface Activity {
  name: string,
  permissions: string[]
}

export interface AuthGroup {
  id: uuid,
  title: string,
  activities: Activity[]
}

export type AuthGroupProperties = Omit<AuthGroup, 'id'>

export interface CreateAuthGroup {
  create(authGroup: AuthGroupProperties): Promise<AuthGroup>
}

// get | update | create | delete
