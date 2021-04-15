import { Activity, ListAuthGroupActivity } from '@/entity/auth-group'
import { uuid } from '@/entity/utils'
import { GetAuthGroupRepository } from './protocols/list-auth-group-repository'

export class DbCreateAuthGroupActivity implements ListAuthGroupActivity {
  constructor (private readonly authGroupRepo: GetAuthGroupRepository) {}

  async list (authGroupId: uuid): Promise<Activity[]> {
    const authGroup = await this.authGroupRepo.get(authGroupId)
    if (!authGroup) {
      throw new Error(`auth group not found for id: ${authGroupId}`)
    }
    return authGroup.activities
  }
}
