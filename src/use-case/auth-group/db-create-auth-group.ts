import { AuthGroup, AuthGroupProperties, CreateAuthGroup } from '@/entity/auth-group'

export class DbCreateAuthGroup implements CreateAuthGroup {
  async create (authGroup: AuthGroupProperties): Promise<AuthGroup> {
    return null
  }
}
