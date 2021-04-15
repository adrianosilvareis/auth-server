import { AuthGroup, AuthGroupProperties, CreateAuthGroup } from '@/entity/auth-group'
import { CreateAuthGroupRepository } from './protocols/create-auth-grup-repository'

export class DbCreateAuthGroup implements CreateAuthGroup {
  constructor (private readonly createAuthGroupStub: CreateAuthGroupRepository) {}

  async create (authGroup: AuthGroupProperties): Promise<AuthGroup> {
    await this.createAuthGroupStub.create(authGroup)
    return null
  }
}
