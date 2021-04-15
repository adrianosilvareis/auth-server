import { AuthGroup, ListAuthGroup } from '@/entity/auth-group'
import { ListAuthGroupRepository } from './protocols/list-auth-group-repository'

export class DbListAuthGroup implements ListAuthGroup {
  constructor (private readonly listAuthGroupStub: ListAuthGroupRepository) {}

  async list (): Promise<AuthGroup[]> {
    return null
  }
}
